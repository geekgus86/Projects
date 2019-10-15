class Api::V1::InspectionsController < ApplicationController
  
  before_action :authenticate 

  def show
    render json: { success: true, data: ::V1::InspectionService.get_tool_trends(params[:id]) }
  end

  def get_actual_trend
    render json: { success: true, data: ::V1::InspectionService.get_today_inspections(params[:tool_id]) }
  end

  def create
    render json: { success: true, data: ::V1::InspectionService.create_inspection(inspection_params) }
  end

  def get_inspection_check_list_approvals
    render json: ::V1::InspectionService.get_inspection_check_list_approvals(params)
  end

  def get_inspection_report_by_work_order
    render json: { success: true, data: ::V1::InspectionService.get_inspection_report_by_work_order(params) }
  end

  private
    def inspection_params
      params.require(:inspection)
            .permit(
              :ToolID,
              :WorkOrderID,
              :Success,
              :Remark,
              :JulianCode,
              inspection_approvals_attributes: [
                :InspectionCheckID,
                :InspectionValue,
                :InspectionApprove
              ]
            )
    end
end