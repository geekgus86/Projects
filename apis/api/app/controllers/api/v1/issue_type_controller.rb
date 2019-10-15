class Api::V1::IssueTypeController < ApplicationController
  def index
    render json: IssueType.all
  end
end
