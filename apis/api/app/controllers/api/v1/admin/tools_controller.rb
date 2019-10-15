class Api::V1::Admin::ToolsController < ApplicationController

    before_action :set_tool, only: [:show, :update, :destroy]

    def index 
        @tools = Tool.all
        json_response(@tools)
    end

    def show
        json_response(@tool)
    end

    def create
        @tool = Tool.create!(tool_params)
        json_response(@tool, :created)
    end
    
    def update
        @tool.update(tool_params)
        head :no_content
    end

    # def destroy
    #     @tool.destroy
    #     head :no_content
    # end

    def tool_params
        # whitelist params
        # params.permit(:ID)
    end

    def set_tool
        @tool = Tool.find(params[:id])
    end

end