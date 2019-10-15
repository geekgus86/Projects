require 'time'
class Api::V1::ProductionControlBoardsController < ApplicationController
  before_action :authenticate

  def getWeekProduction
    render json: { success: true, data: ::V1::ProductionControlBoardService.get_week_production(only_schema, asset_id)}
  end

  def getReportsOfTheDay
    day = params[:day] ? Time.parse(params[:day]): Time.now
    render json: {success: true, data: ::V1::ProductionControlBoardService.get_reports_of_day(day, only_schema, asset_id)}
  end

  def getLastRecordProduction
    #day = params[:day] ? Time.parse(params[:day]): Time.now
    render json: {success: true, data: ::V1::ProductionControlBoardService.get_last_record_production(asset_id)}
  end

  def getInfoShift
    day = params[:day] ? Time.parse(params[:day]): Time.now 
    #FIXME revisar porque se puso a 12 horas utc, falta validar etown
    #day = day.utc.change(hour: 12)
    data = ::V1::ProductionControlBoardService.get_shift_information day, only_schema, asset_id
    shift = ::V1::SensaiShifts.get_shifts only_schema, day

    from_date = shift["rangeShift"][:startAt]
    to_date = shift["rangeShift"][:endAt]
    
    date_range = "#{I18n.l(from_date, format: '%d %b %H:%M%p')} - #{I18n.l(to_date, format: '%d %b %H:%M%p')}"
    render json: {success: true, fromDate: from_date.strftime('%Y-%m-%d %H:%M'), toDate: to_date.strftime('%Y-%m-%d %H:%M'), range: date_range, data: data}
  end
end
