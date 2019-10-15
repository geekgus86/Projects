class Api::V1::DailyProductionReportsEnhancedController < ApplicationController
  before_action :authenticate

  def get_om
    start_date = params[:val1]
    end_date = params[:val2]
    service = Services::DailyProductionReportEnhanced.new(start_date, end_date, asset_id)
    header = service.get_header

    render json: header.to_json

  end

  def get_shift_detail
    start_date = params[:val1]
    end_date = params[:val2]
    service = Services::DailyProductionReportEnhanced.new(start_date, end_date, asset_id)

    gstrokes = service.get_shift_detail

    render json: gstrokes.to_json
  end

  def get_real_strokes_header 
    # start_date = params[:val1]
    # end_date = params[:val2]
    start_date = DateTime.parse(params[:val1]).utc.strftime('%Y-%m-%d %H:%M:%S %Z')
    end_date = DateTime.parse(params[:val2]).utc.strftime('%Y-%m-%d %H:%M:%S %Z')

    service = Services::DailyProductionReportEnhanced.new(start_date, end_date, asset_id)
    shift_detail = service.get_real_strokes_header

    render json: shift_detail.to_json
  end

  
  def get_daily_production_report 
    # start_date = params[:val1]
    # end_date = params[:val2]
    start_date = DateTime.parse(params[:val1]).utc.strftime('%Y-%m-%d %H:%M:%S %Z')
    end_date = DateTime.parse(params[:val2]).utc.strftime('%Y-%m-%d %H:%M:%S %Z')

    service = Services::DailyProductionReportEnhanced.new(start_date, end_date, asset_id)
    shift_detail = service.get_daily_production_report

    render json: shift_detail.to_json
  end

  def get_real_strokes_tool
    start_date = params[:val1]
    end_date = params[:val2]

    tool = params[:tool]
    work_order_id = params[:work_order_id]
    service = Services::DailyProductionReportEnhanced.new(start_date, end_date, asset_id, tool, work_order_id)
    real_strokes_tool = service.get_real_strokes_tool

    render json: real_strokes_tool.to_json
  end  
end
