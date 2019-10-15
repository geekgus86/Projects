class Api::V1::InspectionCheckListsController < ApplicationController
  def show
    render json: {success: true, data: { checklist: ::V1::InspectionCheckListService.get_inspection_check_lists(params) }}
  end
end