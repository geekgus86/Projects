class Api::V1::KpiController < ApplicationController
  before_action :authenticate 

  def getKpis
    startDay = params[:startDay]
    endDay = params[:endDay]

    turn = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"

    from = turn["rangeShift"][:startAtUTC]
    to = turn["rangeShift"][:endAtUTC]

    service = Services::DailyProductionReport.new(from, to, asset_id)
    r = service.get_real_strokes_header

    dataReturn = {:success => true, :data => {:totalOutTime => r[:OutTime], :totalStrokes => r[:golpes],:potentialStrokes => r[:golpesp], :oapr => r[:percentageOaPr], 
        :tpco => r[:changeover], :tcr => "", :gsph => r[:gspm], :coEvents => r[:eventCo], :coMinutes => r[:minCo].round(2), :avgCoMins => r[:changeover], :percentageCo => r[:percentageCo].round(2), 
        :dtMinutes => r[:ttaSum].round(2), :percentageDt => r[:percentageTtaSum].round(2), :tnr => r[:percentageTnr].round(2), :tnd => r[:tnd],
        :mttrProm => r[:mttrProm].round(2), :ansAvgTime =>"-"}}

    render json: dataReturn
  end

  def getAfectacionEqes
    startDay = params[:startDay]
    endDay = params[:endDay]

    turn = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    
    from = turn["rangeShift"][:startAt].utc
    to =  turn["rangeShift"][:endAt].utc
    
    service = Services::DailyProductionReport.new(from, to,asset_id)
    r = service.get_kpi

    render json: { success: true, data: r}
  end

  def getShiftKpis
    startDay = params[:startDay]
    endDay = params[:endDay]

    dataReturn = {}
    date_range = ((Date.parse startDay) .. ( (Date.parse endDay) ) )
    date_range.each do |date|
        
        turns = ::V1::SensaiShifts.get_shifts only_schema, "#{date} 13"

        turns["shifts"].each do |key, shift|
            service = Services::DailyProductionReport.new(shift[:startAt], shift[:endAt],asset_id)

            r1 = service.get_real_strokes_header
            dataReturn[key]  ||= { :oapr => 0, :gspm => 0, :strokes => 0, :avgCo => 0, :potentialStrokes => 0, :tnd => 0 , :minCo => 0, :eventCo => 0, :title => shift[:Description] }
            dataReturn[key][:strokes] += r1[:golpes]
            dataReturn[key][:potentialStrokes] += r1[:golpesp]
            dataReturn[key][:tnd] += r1[:tnd]
            dataReturn[key][:eventCo] += r1[:eventCo]
            dataReturn[key][:minCo] += r1[:minCo]
        end

    end

    turns = ::V1::SensaiShifts.get_shifts only_schema, nil

    #Recorremos de nuevo los turnos :) 
    
    result = []
    turns["shifts"].each do |key, shift|
        oaxpr = ( dataReturn[key][:strokes] / (dataReturn[key][:potentialStrokes] >= 1 ? dataReturn[key][:potentialStrokes] : 1)) * 100
        gspm = (dataReturn[key][:strokes] / (dataReturn[key][:tnd] > 0 ? dataReturn[key][:tnd] : 1))
    
        dataReturn[key][:oapr] = oaxpr.round(2)
        dataReturn[key][:gspm] = gspm.round(2)
        dataReturn[key][:avgCo] = (dataReturn[key][:minCo] / dataReturn[key][:eventCo]).round(2)    

        result << dataReturn[key]
    end

    render json: { success: true, data: result}
  end




  def getGlobalIndicators   
    startDay = params[:startDay]
    endDay = params[:endDay]

    turnsFrom = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    turnsTo = ::V1::SensaiShifts.get_shifts only_schema, "#{endDay} 13"

    from = turnsFrom["rangeShift"][:startAt]
    to =  turnsTo["rangeShift"][:endAt]

    service = Services::DailyProductionReport.new(from, to,asset_id)
    r = service.get_real_strokes_header

    render json: { success: true, data: {:oapr => r[:percentageOaPr], :co => r[:percentageCo], :dt => r[:percentageTtaSum], :microparos => r[:percentageMcp]}}
  end

  def getParetosDowntime
    startDay = params[:startDay]
    endDay = params[:endDay]

    turn = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    
    from = turn["rangeShift"][:startAt].utc
    to =  turn["rangeShift"][:endAt].utc
    
    service = Services::DailyProductionReport.new(from, to, asset_id)
    r = service.getParetosDowntime(1)
    render json: { success: true, data: r}
  end

  def getParetosChangeover
    startDay = params[:startDay]
    endDay = params[:endDay]

    turnsFrom = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    turnsTo = ::V1::SensaiShifts.get_shifts only_schema, "#{endDay} 13"

    from = turnsFrom["rangeShift"][:startAt]
    to =  turnsTo["rangeShift"][:endAt]

    service = Services::DailyProductionReport.new(from, to,asset_id)
    r = service.getParetosDowntime(2)
    render json: { success: true, data: r}

  end

  def getToolsChangeover
    startDay = params[:startDay]
    endDay = params[:endDay]

    turnsFrom = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    turnsTo = ::V1::SensaiShifts.get_shifts only_schema, "#{endDay} 13"

    from = turnsFrom["rangeShift"][:startAt]
    to =  turnsTo["rangeShift"][:endAt]
asset_id
    service = Services::DailyProductionReport.new(from, to,asset_id)
    r = service.getToolsChangeover
    render json: { success: true, data: r}
  end

  def getToolsPerformance
    startDay = params[:startDay]
    endDay = params[:endDay]

    turnsFrom = ::V1::SensaiShifts.get_shifts only_schema, "#{startDay} 13"
    turnsTo = ::V1::SensaiShifts.get_shifts only_schema, "#{endDay} 13"

    from = turnsFrom["rangeShift"][:startAt]
    to =  turnsTo["rangeShift"][:endAt]

    service = Services::DailyProductionReport.new(from, to,asset_id)
    r = service.getToolsPerformance
    render json: { success: true, data: r}
  end

  def getHourStrokes
    day = params[:day]
    turns = ::V1::SensaiShifts.get_shifts only_schema, "#{day} 13"
    hours = WorkOrderByHour.process_hours(turns["rangeShift"][:startAt].utc, turns["rangeShift"][:endAt].utc, asset_id)

    dataReturn = {}
    
    hours.each do |h|
      next if h["tool"].blank?
      start_time = h["inicio"].utc.in_time_zone("America/Monterrey")
      hour = start_time.strftime('%H')
      format_hour = start_time.strftime('%H:00')
      potential_strokes = h["DesignSpeed"] * (h["OpenSecond"] / 60 );
      
      dataReturn[hour] ||= {:hour => hour, :total_strokes => 0, :potential_strokes => 0, :oapr => 0, :tools => [], :color => "#1174BA",:formatedHour => format_hour}
      dataReturn[hour][:total_strokes] += h["piezas"]
      dataReturn[hour][:potential_strokes] += potential_strokes

      color = h["piezas"] >= ((dataReturn[hour][:potential_strokes] * 85) / 100) ? "#1174BA" : "#EF524C"
      dataReturn[hour][:color] = color

      dataReturn[hour][:tools] << h["tool"]
    end

    dataReturnArr = []
    dataReturn.each do |c, k|
      k[:tools] = k[:tools].uniq
      dataReturnArr << k
    end

    render json: {:success => true, :data => dataReturnArr}
  end

end
