class Services::DailyProductionReportEnhanced
  attr_accessor :startDate, :endDate, :total_time, :tool_code, :workOrderId, :asset_id

  def initialize start_date, end_date, _asset_id, tool = nil, work_order_id = nil
    @startDate = start_date.class.name == "Time" ? start_date : Time.zone.parse(start_date).utc
    @endDate = end_date.class.name == "Time" ? end_date : Time.zone.parse(end_date).utc    
    @asset_id = _asset_id
    total_time = (endDate - startDate).to_i / 60.0
    
    @total_time = total_time > 719 ? ((endDate - startDate).to_i / (24.0 * 60.0 * 60.0)).ceil * (24*60) : 720
    @tool_code = tool
    @workOrderId = work_order_id
  end

  def getToolsPerformance    
    dataResult = {}
    get_shift_detail.each do |wo|    
        toolID = wo[:tools]
        dataResult[toolID] ||= {:tool => toolID, :strokes => 0, :potentialStrokes => 0, :tnd => 0, :gspm => 0, :oapr => 0, :color => "#1174BA"}    
        dataResult[toolID][:strokes] += wo[:golpes]
        dataResult[toolID][:tnd] += wo[:tnd]
        dataResult[toolID][:potentialStrokes] += wo[:golpesP]
    end

    data = []
    dataResult.each do |k,d|
        gspm = (d[:strokes] / (d[:tnd] > 0 ? d[:tnd] : 1))
        oapr = (d[:strokes] / (d[:potentialStrokes] >= 1 ? d[:potentialStrokes] : 1)) * 100
        d[:gspm] = gspm.round(2)
        d[:oapr] = oapr.round(2)

        data << d
    end

    #ordenamos los mejores oa
    data = data.sort { |a, b| b[:oapr] <=> a[:oapr] }
    data = data.first(7)

    data.unshift({:tool => I18n.t(:objective), :total_strokes => 6000, :oapr => 85, :gspm => 5, :color => "#49C8F2", :strokes => 0})
    
    return data.sort_by { |h| h[:oapr] }

  end

  def getToolsChangeover
    workDetails = WorkOrderDetail.includes({:issue => :issue_type}, :tool).by_asset(asset_id).between_date(startDate, endDate).no_microdowntime.by_escaletion(2)

    is_range = (endDate - startDate) / 60 > 1440

    dateGroup = {}
    dateReturn = []
    #operaciones = []
    
    workDetails.each do |wo|
      next unless wo.IssueID
      toolID = wo.ToolID
      tool = wo.tool
      toolCode = tool.DescTool 
      issueType = wo.issue.issue_type
      minutes = (wo.OpenSecond / 60).round(2)
      code = wo.issue.DTCode
      
      dateGroup[toolID] ||= { :tool_id => toolID, :tool_code => toolCode, :items => [] }
      dateGroup[toolID][:items] << {:issue_type => issueType.DescIssueType ,:issue_type_color => issueType.Color, :issue_minutes => minutes, :issue_type_id => issueType.ID, :code => code }          
    end

    dateGroup.each do |c, dg|
      total_events = dg[:items].count
      total_issue_minutes = dg[:items].sum {|e| e[:issue_minutes]}

      if is_range
        dg[:total_issue_minutes] = total_issue_minutes / total_events
        items_grouped = dg[:items].group_by { | item | item[:issue_type_id] }
        items = items_grouped.map do | issue_type_id, items_element |  
          {
            issue_type: items_element[0][:issue_type],
            issue_type_color: items_element[0][:issue_type_color],
            issue_minutes: items_element.sum{|e| e[:issue_minutes]} / total_events,
            issue_type_id: issue_type_id
          }
        end
      end


      dg[:items] = dg[:items].sort { |a, b| b[:issue_type_id] <=> a[:issue_type_id] }
      dg[:total_events] = total_events
      dg[:total_issue_minutes] = total_issue_minutes
      # dg[:percentageTime] = (total_issue_minutes]/dg[:items].count).round(2)

      dateReturn << dg
    end

    #Order by total_issue_minutes
    dateReturn = dateReturn.sort { |a, b| b[:total_issue_minutes] <=> a[:total_issue_minutes] }
    
    #Only get the first 10
    dateReturn = dateReturn.first(10)

    return dateReturn
  end

  def getParetosDowntime report_status
    workOrderDetails = WorkOrderDetail.includes({:issue => :issue_type}, :tool).by_asset(asset_id).between_date(startDate, endDate).no_microdowntime.only_downtime.by_escaletion(report_status)
    out_time = WorkOrderDetail.includes({:issue => :issue_type}, :tool).by_asset(asset_id).between_date(startDate, endDate).only_out_time.sum(&:OpenSecond)
    tnd = ((endDate - startDate) - out_time) / 60
    result = {}
    workOrderDetails.each do |wo|
      wo.set_issue_group
      issue_id = wo.IssueID.to_s
      issue = wo.issue
      minutes = (wo.OpenSecond / 60).round(2)
      result[issue_id] ||= {:issue => wo.IssueID, :dtCode => issue.DTCode, :coCode => issue.COCode, :desc => issue.DescIssue, :color => issue.issue_type.Color, :issue_count => 0, :issue_minutes => 0, :percentage => 0, :tools => []}
      result[issue_id][:tools] += [{:issue => issue_id, :tool_code => wo.work_order.tool.DescTool, :issue_minutes => minutes, :percentage => ((minutes / tnd) * 100).round(2)}] 
      result[issue_id][:issue_count] += 1
      result[issue_id][:issue_minutes] += minutes
      result[issue_id][:percentage] = ((result[issue_id][:issue_minutes] / tnd) * 100).round(2)
    end

    result = result.map do |key, value|
      # value[:tools] = [{
      #   issue: c[:tools][0][:issue],
      #   tool_code: c[:tools][0][:tool_code],
      #   issue_minutes: c[:tools].sum{|e| e[:issue_minutes]}.round(2),
      #   percentage: c[:tools].sum{|e| e[:percentage]}.round(2)
      # }]
      events = value[:tools].group_by{ | tool | tool[:tool_code] }
      
      tools = events.map do | tool, tool_events |  
        {
          issue: tool_events[0][:issue],
          tool_code: tool_events[0][:tool_code],
          issue_minutes: tool_events.sum{|e| e[:issue_minutes]}.round(2),
          percentage: tool_events.sum{|e| e[:percentage]}.round(2)
        }
      end  

      value[:tools] = tools
      value
    end

    result.sort{|x,y| y[:percentage] <=> x[:percentage]}

  end

  def processHeader
    header = []
    detail = WorkOrderDetail.by_asset(asset_id).between_date(startDate, endDate)

    IssueType.enabled.each do |it|
      issue_id = it.issues.by_asset(asset_id).map(&:ID)  

      if(it.ID == 7)
        is_microdowntime = true
      end

      woDetail = detail.no_microdowntime.by_issue_id(issue_id).by_asset(asset_id)

      wo = if(is_microdowntime)
        detail.only_microdowntime.by_asset(asset_id)
      else 
         woDetail
      end
      
      wo_stops = (wo.by_escaletion(1).sum(&:OpenSecond) / 60).round(2)
      wo_co = (wo.by_escaletion(2).sum(&:OpenSecond) / 60).round(2)

      wo_stops_count = wo.by_escaletion(1).count
      wo_count_count = wo.by_escaletion(2).count
    
      time_tnr = ((detail.select{|wd| ((wd.IssueID.blank? || wd.IssueID == 117 ) && wd.OpenSecond >= 60 )}.sum(&:OpenSecond)) / 60).round(2)

      #Hay que clacular el out y sustituirlo por los 1440 
      work_order_detail_out = detail.only_out_time
      out_time = (work_order_detail_out.map(&:OpenSecond).compact.sum / 60 ) || 0

      tnd = it.ID == 5 ? @total_time : (@total_time-out_time)

      percentageTnr = ((time_tnr / tnd) * 100).round(2)

      # add tnr to operations
      if(it.ID == 2) 
        wo_stops += time_tnr  
      end

      percentageAfects = (((wo_stops + wo_co) / tnd) * 100).round(2)

      #tta_sum += (wo_stops + wo_co)
      wo_co = 0 if is_microdowntime
      header << {:id => it.ID, :title => it.DescIssueType, :color => it.Color, :percentageAfects => percentageAfects, :affects => it.Affect,
                  :downtime => wo_stops, :downtime_co => wo_co, :dt_count => wo_stops_count,
                  :co_count => wo_count_count, :setup => it.RealDown, :tnrResult => percentageTnr, :minutes_tnr => time_tnr}

    end
    return header
  end

  def get_header
    header = []
    wos = WorkOrderDetail.by_asset(asset_id).between_date(startDate, endDate).no_microdowntime

    IssueType.only_area.each do |it|

      issue_id = it.issues.map(&:ID)
      wo = wos.select{|wd| issue_id.include?(wd.IssueID) || issue_id.include?(wd.group.try(:IssueID))}

      wo_stops = (wo.select{|wd| wd.EscalationTypeID == 1}.sum(&:OpenSecond) / 60).round(2)
      wo_co = (wo.select{|wd| wd.EscalationTypeID == 2}.sum(&:OpenSecond) / 60).round(2)

      wo_stops_count = wo.select{|wd| wd.EscalationTypeID == 1}.length
      wo_count_count = wo.select{|wd| wd.EscalationTypeID == 2}.length
      #tta_sum += (wo_stops + wo_co)
      header << {:id => it.ID, :title => it.DescIssueType, :color => it.Color,
                  :downtime => wo_stops, :downtime_co => wo_co, :dt_count => wo_stops_count, :co_count => wo_count_count, :setup => it.RealDown}

    end
    return header
  end

  def get_om
    header = []

    processHeader.each do |p|
      header << {:id => p[:id], :title => p[:title], :color => p[:color], :percentageAfects => p[:percentageAfects],
                 :downtime => p[:downtime], :downtime_co => p[:downtime_co], :dt_count => p[:dt_count], :co_count => p[:co_count], :setup => p[:setup]}
    end

    detail = WorkOrderDetail.by_asset(asset_id).between_date(startDate, endDate)
    wo = detail.no_microdowntime.where(:IssueID => nil, :WorkOrderDetailGroupID => nil)
   
    wo_stops = (wo.by_escaletion(1).sum(&:OpenSecond) / 60).round(2)
    wo_co = (wo.by_escaletion(2).sum(&:OpenSecond) / 60).round(2)

    wo_stops_count = wo.by_escaletion(1).count
    wo_count_count = wo.by_escaletion(2).count
      
    time_tnr = wo.sum(&:OpenSecond) / 60

    percentageTnr = (time_tnr / @total_time) * 100

    percentageAfects = ((wo_stops + wo_co) / @total_time) * 100

    header << {:id => nil, :title => "#{I18n.t(:unassigned)}", :color => "#000000", :percentageAfects => percentageAfects, 
                :affects => 0, :downtime => wo_stops, :downtime_co => wo_co, :dt_count => wo_stops_count,
                :co_count => wo_count_count, :setup => 0, :tnrResult => percentageTnr, :minutes_tnr => time_tnr}

    return header
  end

  def get_kpi
    header = []

    processHeader.each do |p|
      header << {:id => p[:id], :name => p[:title], :color => p[:color], :afect => p[:percentageAfects], :objectiveDt => p[:affects],
                 :dt_minutes => p[:downtime], :co_minutes => p[:downtime_co], :tnrPct => p[:tnrResult], :tnrMin => p[:minutes_tnr]}

    end
    return header
  end

  #Corridas
  def get_shift_detail

    puts "ID: #{asset_id}"

    asset = Asset.find_by_id(asset_id).attributes

    puts "nameass: #{asset}"

    puts "StartDate: #{startDate}, EndDate #{endDate}, assetName: #{asset[:Name]}"
    details = Prodtrack.execute_procedure('admin.getProductionRateReport', startDate: startDate, endDate: endDate, assets: asset_id, toolIdList: nil, shiftIdList: nil)
    puts 'Probando: '
    puts "#{details}"
    #puts details.map(&:workOrderID)
    workorder = [] 
    details.each do |d|
      puts "Tool: #{d[:descTool]}"
      workorder << {:workOrderID => d[:workOrderId], :tools => d[:descTool], :paros => d[:afectationEvents], :golpes => d[:realHits], :scrap => d[:piecesScrap], :retrabajo => d[:piecesRework], :Minutos => 0,:RealSpeed =>d[:RealMaxSpeed], 
        :OutTime => 0,:veldis => d[:designSpeed],:tnd => d[:TNDMinutes],:gspm => d[:hitsByMinute], :golpesP => 0, 
        :percentageOaPr => d[:OAxPR], :changeover => d[:CO], :velRealTT =>0,:num_juliano =>d[:julianCode], :dateperiod => d[:dateperiod]}
    end

    return workorder
  end

  #Turno
  def get_real_strokes_header start_dat = nil, end_date = nil

    puts "get_real_strokes_header -------------------->"

    puts "ID: #{asset_id}"

    asset = Asset.find_by_id(asset_id).attributes

    puts "nameass: #{asset}"

    puts "StartDate: #{startDate}, EndDate #{endDate}, assetName: #{asset[:Name]}"
    details = Prodtrack.execute_procedure('admin.getProductionRateReport', startDate: startDate, endDate: endDate, assets: asset_id, toolIdList: nil, shiftIdList: nil)
    puts 'Probando: '
    puts "#{details}"
    
    result = {:time_tnr => 0, :workorder => 1,:ID => 1, :tool => 0, :golpes => 0, :golpesp => 0, :scrap => 0,:retrabajo => 0, 
              :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => 0, :percentageOaPr => 0, :minCo => 0, :percentageCo => 0, :eventCo => 0,
              :paros => 0, :IssueID => 107, :IssueTypeID => 5, :changeover => 0, :OutTime => 0, :tnd => 0, :veldis => "", :dateperiod => "",
              :ttaSum => 0, :percentageTtaSum => 0, :percentageTnr => 0, :mttrProm => 0, :totalMcp => 0, :percentageMcp => 0
            }
    gspm = 0
    co_prom = 0
    oaxpr = 0

    details.each do |d|
      result[:paros] += d[:afectationEvents].to_i
      result[:golpes] += d[:realHits].to_i
      result[:tnd] += d[:TNDMinutes].to_f.round(2)
      result[:retrabajo] += d[:piecesRework].to_i
      result[:scrap] += d[:piecesScrap].to_i
      gspm += d[:hitsByMinute].to_f
      co_prom += d[:CO].to_f
      oaxpr += d[:OAxPR].to_f
    end

    result[:tnd] = result[:tnd].round(2)
    result[:tool] = details.size
    result[:percentageOaPr] = (oaxpr/details.size).round(2) unless details.size==0
    result[:gspm] = (gspm/details.size).round(2) unless details.size==0
    result[:changeover] = (co_prom/details.size).round(2) unless details.size==0


    return result

  end

  #DPR
  def get_daily_production_report start_dat = nil, end_date = nil

    puts "get_daily_production_report -------------------->"

     puts "ID: #{asset_id}"

    asset = Asset.find_by_id(asset_id).attributes

    puts "nameass: #{asset}"

    puts "StartDate: #{startDate}, EndDate #{endDate}, assetName: #{asset[:Name]}"
    details = Prodtrack.execute_procedure('admin.getProductionRateReport', startDate: startDate, endDate: endDate, assets: asset_id, toolIdList: nil, shiftIdList: nil)
    puts 'Probando: '
    puts "#{details}"
    

    headerPrincipal = {:time_tnr => 0, :workorder => 1,:ID => 1, :tool => 0, :golpes => 0, :golpesp => 0, :scrap => 0,:retrabajo => 0, 
      :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => 0, :percentageOaPr => 0, :minCo => 0, :percentageCo => 0, :eventCo => 0,
      :paros => 0, :IssueID => 107, :IssueTypeID => 5, :changeover => 0, :OutTime => 0, :tnd => 0, :veldis => "", :dateperiod => "",
      :ttaSum => 0, :percentageTtaSum => 0, :percentageTnr => 0, :mttrProm => 0, :totalMcp => 0, :percentageMcp => 0
    }


    gspm = 0
    co_prom = 0
    oaxpr = 0
    co_count = 0
    
    details.each do |d|
      isOut = d[:isTryOut] || d[:isOut]
      headerPrincipal[:paros] += d[:afectationEvents].to_i
      headerPrincipal[:golpes] += d[:realHits].to_i unless isOut
      headerPrincipal[:tnd] += d[:TNDMinutes].to_f
      headerPrincipal[:time_tnr] += d[:totalTimeNotReported].to_f
      headerPrincipal[:retrabajo] += d[:piecesRework].to_i
      headerPrincipal[:scrap] += d[:piecesScrap].to_i
      gspm += d[:hitsByMinute].to_f
      if d[:CO].to_f > 0 then
        co_prom += d[:CO].to_f
        co_count+=1
      end
      oaxpr += d[:TNDMinutes].to_f * d[:designSpeed].to_f
    end

    headerPrincipal[:tnd] = headerPrincipal[:tnd].round(2)
    headerPrincipal[:time_tnr] = headerPrincipal[:time_tnr].round(2)
    headerPrincipal[:tool] = details.size
    headerPrincipal[:percentageOaPr] = 0
    headerPrincipal[:percentageOaPr] = ((headerPrincipal[:golpes]/oaxpr)*100).round(2) unless oaxpr<=0
    if headerPrincipal[:percentageOaPr] > 100 then
        headerPrincipal[:percentageOaPr] = 100
    end
    if headerPrincipal[:percentageOaPr] <= 0 then
        headerPrincipal[:percentageOaPr] = 0
    end
    headerPrincipal[:gspm] = (headerPrincipal[:golpes]/headerPrincipal[:tnd]).round(2) unless headerPrincipal[:tnd]==0
    if headerPrincipal[:gspm] <= 0 then
      headerPrincipal[:gspm] = 0
    end
    headerPrincipal[:changeover] = (co_prom/co_count).round(2) unless co_count==0

    
    shiftDetails = Array.new

    if details.is_a? Array
      turnos = details.map{ |h| h[:shiftDesc] }.uniq
      puts "Turnos: #{turnos}"
    end

    turnos.each do |t|
      workorder = [] 
    
      gspm = 0
      co_prom = 0
      oaxpr = 0
      co_count = 0

      shift = {:time_tnr => 0, :workorder => 1,:ID => 1, :tool => 0, :golpes => 0, :golpesp => 0, :scrap => 0,:retrabajo => 0, 
        :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => 0, :percentageOaPr => 0, :minCo => 0, :percentageCo => 0, :eventCo => 0,
        :paros => 0, :IssueID => 107, :IssueTypeID => 5, :changeover => 0, :OutTime => 0, :tnd => 0, :veldis => "", :dateperiod => "",
        :ttaSum => 0, :percentageTtaSum => 0, :percentageTnr => 0, :mttrProm => 0, :totalMcp => 0, :percentageMcp => 0
      }

      details.select{|de| de[:shiftDesc] == t}.each do |d|
        puts "Tool: #{d[:descTool]}"
        isOut = d[:isTryOut] || d[:isOut]
        d[:descTool] = "#{d[:descTool]}*" if d[:isOut]
        workorder << {:workOrderID => d[:workOrderId], :tools => d[:descTool], :paros => d[:afectationEvents], :golpes => d[:realHits], :scrap => d[:piecesScrap], :retrabajo => d[:piecesRework], :Minutos => 0,:RealSpeed =>d[:RealMaxSpeed], 
          :OutTime => 0,:veldis => d[:designSpeed],:tnd => d[:TNDMinutes],:gspm => d[:hitsByMinute], :golpesP => 0, :IsTryOut => d[:isTryOut], :IsOut => d[:isOut], :is_out_s => isOut,
          :percentageOaPr => d[:OAxPR], :changeover => d[:CO], :velRealTT =>0,:num_juliano =>d[:julianCode]?d[:julianCode]:0, :dateperiod => d[:dateperiod]}
        shift[:paros] += d[:afectationEvents].to_i
        shift[:golpes] += d[:realHits].to_i unless isOut
        shift[:tnd] += d[:TNDMinutes].to_f
        shift[:time_tnr] += d[:totalTimeNotReported].to_f
        shift[:retrabajo] += d[:piecesRework].to_i
        shift[:scrap] += d[:piecesScrap].to_i
        gspm += d[:hitsByMinute].to_f
        if d[:CO].to_f > 0 then
          co_prom += d[:CO].to_f
          co_count+=1
        end
        oaxpr += d[:TNDMinutes].to_f * d[:designSpeed].to_f
      end
      size = details.select{|de| de[:shiftDesc] == t}.size
      shift[:tnd] = shift[:tnd].round(2)
      shift[:time_tnr] = shift[:time_tnr].round(2)
      shift[:tool] = size
      shift[:percentageOaPr] = 0
      shift[:percentageOaPr] = ((shift[:golpes].to_i/oaxpr)*100).round(2) unless oaxpr<=0
      if shift[:percentageOaPr] > 100 then
        shift[:percentageOaPr] = 100
      end
      if shift[:percentageOaPr] <= 0 then
          shift[:percentageOaPr] = 0
      end
      shift[:gspm] = (shift[:golpes]/shift[:tnd]).round(2) unless shift[:tnd]==0
      if shift[:gspm] <= 0 then
        shift[:gspm] = 0
      end
      shift[:changeover] = (co_prom/co_count).round(2) unless co_count==0

      shift[:details] = workorder
      shift[:Description] = t

      shiftDetails << shift
    end   

    shifts = Shift.where(:OrganizationSchemaID => asset_id)

    puts "Shift turno: #{shifts}"

    count = 1
    shifts.each do |s|
      puts "Shift turno: #{s.Description}"
      next if shiftDetails.detect{|sd| sd[:Description] == s.Description}

      if count < 3 then
        shiftDetails << {:time_tnr => 0, :workorder => 1,:ID => 1, :tool => 0, :golpes => 0, :golpesp => 0, :scrap => 0,:retrabajo => 0, 
          :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => 0, :percentageOaPr => 0, :minCo => 0, :percentageCo => 0, :eventCo => 0,
          :paros => 0, :IssueID => 107, :IssueTypeID => 5, :changeover => 0, :OutTime => 0, :tnd => 0, :veldis => "", :dateperiod => "",
          :ttaSum => 0, :percentageTtaSum => 0, :percentageTnr => 0, :mttrProm => 0, :totalMcp => 0, :percentageMcp => 0, :Description=> s.Description,
          :details=> [ ]
        }
      else 
        shiftDetails.insert(0, {:time_tnr => 0, :workorder => 1,:ID => 1, :tool => 0, :golpes => 0, :golpesp => 0, :scrap => 0,:retrabajo => 0, 
          :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => 0, :percentageOaPr => 0, :minCo => 0, :percentageCo => 0, :eventCo => 0,
          :paros => 0, :IssueID => 107, :IssueTypeID => 5, :changeover => 0, :OutTime => 0, :tnd => 0, :veldis => "", :dateperiod => "",
          :ttaSum => 0, :percentageTtaSum => 0, :percentageTnr => 0, :mttrProm => 0, :totalMcp => 0, :percentageMcp => 0, :Description=> s.Description,
          :details=> [ ]
        })
      end
      count+=1
      puts "Asigne: "
     end

    return {:headerPrincipal=> headerPrincipal, :shiftDetails =>shiftDetails}

  end

  def get_real_strokes_tool
    work_order = WorkOrder.find_by_ID workOrderId #between_date(startDate, endDate).by_tool_code(tool_code)
    
    work_order_detail = WorkOrderDetail.by_asset(asset_id).get_last_co(work_order.StartAt, work_order.EndAt, workOrderId)
    tnr_sum = 0
    in_group = []
    w_detail = []
    wo_details = work_order.work_order_details#.between_wo(startDate, endDate)
    w_tiempo_mcp = wo_details.only_microdowntime

    w_total_mcp = w_tiempo_mcp.sum(&:OpenSecond) / 60
    w_detail = [{:stop => "#{I18n.t(:microdowntime).upcase}", :start_at => "#{w_tiempo_mcp.length} #{I18n.t(:events).upcase}", :time_total => w_total_mcp, :detalle_dt => "O998 #{I18n.t(:microdowntime).upcase}", :color => "#000000", :color_report => "#000000"}]

    (work_order_detail.order(:EndAt) + wo_details.no_microdowntime.order(:EndAt)).each do |wd|

      isGroup = wd.WorkOrderDetailGroupID.present?
      detalle_dt = "#{I18n.t(:no_reported_time)} #{I18n.t(:comment)}:"

      next if wd.OpenSecond.blank? || (isGroup && in_group.include?(wd.WorkOrderDetailGroupID))
      
      if isGroup 
        group = wd.group
        wd.IssueID = group.IssueID
        wd.ReportNumber = group.ReportNumber
        wd.OpenSecond= group.GroupSeconds
        in_group << wd.WorkOrderDetailGroupID
      end

      p "vic98"

      # puts wd.WorkOrderDetailGroupID
      p "vic9"
      
      #wd.set_in_renge work_order.StartAt, work_order.EndAt if wd.EscalationTypeID == 2
      wd.set_in_renge wd.StartAt, wd.EndAt if wd.EscalationTypeID == 2

      time_total = wd.OpenSecond / 60
      
      type_stop = I18n.t(:downtime)
      color_report = "#EA5557"
      if wd.EscalationTypeID == 1 && wd.ReportStatusID == 19
        type_stop = I18n.t(:low_speed_abbr)
        color_report = "#8E65BA"
      elsif wd.EscalationTypeID == 2
        type_stop = I18n.t(:changeover_abbr)
        color_report = "#F5A623"
      end

      type_stop = type_stop.upcase

      dateperiod = "#{wd.StartAt.strftime('%H:%M')} - #{wd.EndAt.strftime('%H:%M')}"
      report_number = wd.ReportNumber
      division_ind = wd.ReportDivision ? wd.ReportDivision : ""

      report_name = "#{type_stop} ##{report_number} #{division_ind}"
      if wd.EscalationTypeID == 1 && wd.ReportStatusID == 19
        report_name =  "#{type_stop} #{division_ind}"
      elsif wd.EscalationTypeID == 2
        report_name =  "#{type_stop} #{division_ind}"
      end     

      if wd.IssueID && wd.OpenSecond >= 60
        issue = wd.issue
        issue_type = issue.try(:issue_type) 

        code = wd.EscalationTypeID == 1 ? issue.try(:DTCode)  : issue.try(:COCode)

        detalle_dt = "#{issue_type.try(:DescIssueType)} / #{code} #{issue.try(:DescIssue)} #{I18n.t(:comment)}: "
        #{:WorkOrderID =>1,:ID => wd.ID, :tool_code => 0, :Golpes => 0,:GolpesP => 0, :Scrap => 0,:Retrabajado => 0, :tiempo => 0, :RealSpeed => 0, :ShiftID => 0,
        #:IssueID => 107, :tipo => 0, :ChangeOver => 0, :OutTime => 0, :tnd => 0, :DesignSpeed => 0, :dateperiod => "18:00-18:07"}
        w_detail << {:stop => report_name, :start_at => dateperiod, :time_total => time_total, :detalle_dt => detalle_dt, :color => issue_type.try(:Color), :color_report => color_report, :is_grouped => isGroup}
      elsif wd.IssueID.blank? && wd.OpenSecond >= 60
        
        w_detail << {:stop => report_name, :start_at => dateperiod, :time_total => time_total, :detalle_dt => detalle_dt, :color => "#000000", :color_report => "#000000", :is_grouped => isGroup}
      elsif wd.IssueID.blank?
        tnr_sum += time_total
      end
    end

    
    return w_detail
  end

  private

 

end