class Api::V1::ForumController < ApplicationController
  
  before_action :authenticate 

  def getComment
    id = params[:id]
    report = WorkOrderDetail.find_by_ID(id)
    selected = { report: id, id: id, issue: report[:IssueID], createdAt: report[:CreatedAt], escalationLevel: report[:EscalationRuleID] }
    data = WorkOrderLog.where({:ReportStatusID => 18, WorkOrderDetailID: id})
    result = []
    data.each do |value| 
      e = { type: 'comment', id: value.ID, data: value.Message, user: value.UserID, report: id, createdAt: value.CreatedAt, name: value.username }
      result << e 
    end
    data
    render json: { success: true, selected: selected, data: result }
  end

  def newComment
    userId = Auth::Current.user['id']
    id = params[:id]
    data = params[:data]
    start_date = Time.now
    username = Auth::Current.user['name']
    data = {:ReportStatusID => 18, :UserID => userId, :Message => '{"message": "'+data+'"}', 
            :CreatedAt => start_date, :WorkOrderDetailID => id, :username => username}
    data = WorkOrderLog.create(data)
    data = data.attributes
    data[:AssetID] = asset_id
    data['dbSchema'] = {:DB => get_database, :schema => schema, :asset => only_schema}
    ::V1::EventBus::EventBusService.publish 'metalsa/commentAddedprod', data
    render json: { success: true, data: data }
  end

end