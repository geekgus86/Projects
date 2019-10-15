class Services::DailyProductionReport
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


    work_order = WorkOrder.includes(:tool).by_asset(asset_id).between_date(startDate, endDate)
    #work_order_detail = WorkOrderDetail.by_asset(asset_id).between_date(startDate, endDate).no_microdowntime
    workorder = [] 
    work_order.each do |w|
      w_start_at = w.StartAt
      w_end_at = w.EndAt
      w_tiempo_total_wo = w.OpenSecond / 60
      w_tiempo_out = 0
      tool = w.tool
      w_design_speed = tool.DesignSpeed
      w_golpes_reales = w.UnitsAuto
      w_name_too = tool.DescTool 
      w_name_too = w.IsOut ? "#{w_name_too} *" : w_name_too

      wo_details = w.work_order_details.no_microdowntime #.between_wo(w_start_at, w_end_at)

      w_tiempo_out = wo_details.select{|wd| wd.is_out_time && wd.ToolID == tool.ID}.sum(&:OpenSecond) / 60

      w_tiempo_tnd = w_tiempo_total_wo - w_tiempo_out
      w_golpe_p = w_design_speed * w_tiempo_tnd

      w_gspm = w_golpes_reales / w_tiempo_tnd

      dw = w.daily_work_orders[0]

      julian_number = dw.try(:JulianCode) || 0
      rollo  = dw.try(:RolledSteelID) || 0
      scrap = w.daily_work_orders.map(&:UnitScrap).compact.sum
      rework = w.daily_work_orders.map(&:UnitRework).compact.sum
      minutes = (dw.try(:OpenSecond) || 0) / 60
      velRealTT = w.RealMaxSpeed
      work_order_detailco = WorkOrderDetail.by_asset(asset_id).get_last_co(w_start_at, w_end_at, w.ID)
      wo_co  = wo_details.by_escaletion(2) + work_order_detailco
      wo_co.map{|c| c.set_in_renge(w_start_at, w_end_at)}
      time_co = (wo_co.map(&:OpenSecond).compact.sum || 0) / 60
      paros = wo_details.without_g.length + work_order_detailco.length + wo_details.with_g.map(&:WorkOrderDetailGroupID).uniq.length
      w_aoxpr = (w_golpes_reales / w_golpe_p) * 100
      w_aoxpr = w_aoxpr > 100 ? 100 : w_aoxpr 

      dateperiod = "#{w_start_at.strftime('%H:%M')} - #{w_end_at.strftime('%H:%M')}"
      
      workorder << {:workOrderID => w.ID, :tools => w_name_too,:paros => paros, :golpes => w_golpes_reales, :scrap => scrap, :retrabajo => rework, :Minutos => minutes,:RealSpeed =>velRealTT, 
                    :OutTime => w_tiempo_out,:veldis => w_design_speed,:tnd => w_tiempo_tnd.round(2),:gspm => w_gspm.round(2), :golpesP => w_golpe_p.round(2), 
                    :percentageOaPr => w_aoxpr.round(2), :changeover => time_co.round(2), :velRealTT =>velRealTT,:num_juliano =>julian_number, :dateperiod => dateperiod, :IsTryOut => w.IsTryOut}

    end

    return workorder
  end

  #Turno
  def get_real_strokes_header start_dat = nil, end_date = nil
    # @startDate ||= start_dat
    # @endDate ||=  end_date


    #daily_work_orders = DailyWorkOrder.by_asset(asset_id).between_date(startDate, endDate)
    work_order = WorkOrder.by_asset(asset_id).between_date(startDate, endDate)
    puts "-------------------->"
    puts work_order.map(&:ID)
    work_order_detail = WorkOrderDetail.includes(:work_order => :tool, :issue => :issue_type).by_asset(asset_id).between_date(startDate, endDate)
    work_order_detail_dt = WorkOrderDetail.by_asset(asset_id).between_date(startDate, endDate).by_escaletion(1).only_downtime
    dt_only = 0
    timeDt = 0
    total_mcp = 0
    time_total_mcp = 0
    paros = 0
    time_tnr = 0
    out_time = 0
    co = 0
    num_excludes = 0
    scrap = 0
    rework = 0
    eventCo = []
    wo_json = {}
    tmp_id = ""
    work_order_detail.each do |wd|
      wo = wd.work_order unless wd.work_order.AssetID != asset_id
      next if wo.blank?
      next if wo.EndAt.blank? || wd.EndAt.blank?
      # next if wo.StartAt < startDate || wo.EndAt > endDate
      wd.set_issue_group
      is_co = wd.EscalationTypeID == 2
      wd.set_in_renge(startDate, endDate) if is_co
      open_second = (wd.OpenSecond || 0) / 60
      is_dt = wd.is_downtime
      is_out = wd.is_out_time
      #Tiene que ser mayor a 60 o igual para ser considerado paro
      is_stop = wd.EscalationTypeID == 1 && (wd.OpenSecond || 0) >= 60
      is_stopr = (wd.OpenSecond || 0) >= 60 || wd.IssueID.present?
      paros += 1 if is_stopr && wd.WorkOrderDetailGroupID.blank?
      total_mcp += 1 unless is_stopr
      time_total_mcp += open_second unless is_stopr
      num_excludes += 1 if wd.exclude
      if is_co 
        eventCo << wd.WorkOrderID unless wd.exclude
        co += open_second
      end
      time_tnr += open_second if (wd.IssueID.blank? || wd.IssueID == 117 ) && is_stopr  

      if is_stop && is_dt && is_stopr
        dt_only += 1
        timeDt += open_second
      end
      key = wd.WorkOrderID
      wo_json[key] ||= {is_out_s: (wd.IsTryOut || wd.IsOut), golpes: wo.UnitsAuto, w_tiempo_out: 0, w_design_speed: wo.tool.DesignSpeed, w_tiempo_total_wo: (wo.OpenSecond / 60)} unless wd.exclude

      if is_stopr && is_out
        wo_json[key][:w_tiempo_out] += open_second
        out_time += open_second
      end
    end
    
    w_tiempo_tnd_sum = 0
    sum_golpes_potenciales_turno = 0
    golpes_reales = 0

    wo_json.each do |k, v|
      golpes_reales += v[:golpes] unless v[:is_out_s]
      w_tiempo_tnd = v[:w_tiempo_total_wo] - v[:w_tiempo_out]
      w_tiempo_tnd_sum += w_tiempo_tnd
      w_golpe_p = v[:w_design_speed] * w_tiempo_tnd
      sum_golpes_potenciales_turno += w_golpe_p
    end


    work_order.each do |wo|
      scrap += wo.daily_work_orders.map(&:UnitScrap).compact.sum
      rework += wo.daily_work_orders.map(&:UnitRework).compact.sum
      unless wo_json[wo.ID]
        w_tiempo_tnd_sum += (wo.OpenSecond / 60)
      end

    end
    
    tta_sum = work_order_detail_dt.map(&:OpenSecond).compact.sum / 60
    
    eventCo = eventCo.uniq.length
    eventCo = (eventCo >= 1 ? eventCo : 1)
    time_tnr = time_tnr > 0 ? (time_tnr) : 0
    #TND
    tnd = total_time - out_time
    #GSPM
    gspm = (golpes_reales / (w_tiempo_tnd_sum > 0 ? w_tiempo_tnd_sum : 1))
    #Promedio CO
    promedio_co = co / eventCo
    #Numero Corridas
    num_corridas = work_order.length
    #Numero de Eventos
    num_eventos = work_order_detail.length - num_excludes
    #OAxPR
    oaxpr = (golpes_reales / (sum_golpes_potenciales_turno >= 1 ? sum_golpes_potenciales_turno : 1)) * 100
    ttd = (@total_time - out_time)
    percentageCo = (co / tnd).round(2) * 100
    percentageTtaSum = (tta_sum / ttd) * 100
    percentageTnr = (time_tnr / ttd) * 100
    percentageMcp = (time_total_mcp / ttd) * 100
    mttrProm = timeDt / (dt_only == 0 ? 1 : dt_only)
    paros = paros + work_order_detail.with_g.map(&:WorkOrderDetailGroupID).uniq.length


    return {:time_tnr => time_tnr, :workorder => 1,:ID => 1, :tool => num_corridas, :golpes => golpes_reales.round(2), :golpesp => sum_golpes_potenciales_turno.round(2), :scrap => scrap,:retrabajo => rework, 
            :Minutos => 0,:RealSpeed => "", :ShiftID => 0, :gspm => gspm.round(2), :percentageOaPr => oaxpr.round(2), :minCo => co, :percentageCo => percentageCo, :eventCo => eventCo,
            :paros => paros, :IssueID => 107, :IssueTypeID => 5, :changeover => promedio_co.round(2), :OutTime => out_time.round(2), :tnd => w_tiempo_tnd_sum.round(2), :veldis => "", :dateperiod => "18:00-18:07",
            :ttaSum => tta_sum, :percentageTtaSum => percentageTtaSum, :percentageTnr => percentageTnr, :mttrProm => mttrProm, :totalMcp => total_mcp, :percentageMcp => percentageMcp
          }
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
      
      wd.set_in_renge work_order.StartAt, work_order.EndAt if wd.EscalationTypeID == 2

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
