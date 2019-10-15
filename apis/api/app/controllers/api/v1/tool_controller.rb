class Api::V1::ToolController < ApplicationController
  
  def index
    render json: { success: true, data: Tool.where(Active: 1).by_asset(asset_id) }
  end

  def get_by_filter
    render json: { success: true, data: ::V1::ToolService.get_by_filter(params)}
  end

  def get_by_code
    tool = Tool.find_by_DescTool(params[:code])
    render json: { success: true, data: tool }
  end

  def get_smart_tools
    tools = Tool.get_smart_tools(asset_id)
    render json: { success: true, data: tools }
  end

end
