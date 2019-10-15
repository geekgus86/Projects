class Api::V1::WorkOrderController < ApplicationController
  before_action :authenticate 
  def get_lasts_by_tool
    render json: { success: true, data: ::V1::WorkOrderService.get_lasts_by_tool(params) }
  end

  def pr_calculate
    startDate = params[:startAt].to_t
    endDate = params[:endAt].to_t

    WorkOrderDetail.calculate_pr(startDate, endDate, asset_id)

  end

end
