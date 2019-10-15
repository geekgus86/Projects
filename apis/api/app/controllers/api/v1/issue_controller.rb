class Api::V1::IssueController < ApplicationController
  # How to implement authentication
  #before_action :authenticate

  def index
    render json: Issue.all
  end

  def show
    render json: Issue.find(params[:id])
  end

  def getAllIssues
    data = IssueType.all
    result = []
    data.each do |value|
      result << { id: value.ID, name: value.DescIssueType, desc: value.ShortDesc, issues: value.issues, color: value.Color}
    end
    render json: { "success": true, :data => result }
  end

  def getIssuesByOutType
    out_type_code = params[:out_type_code]
    
    issues = Issue.only_out_type.by_asset(asset_id)

    if out_type_code 
      issues = issues.by_out_type(out_type_code)
    end

    result = []
    issues.each do |value|
        result << { ID: value.ID, DescIssue: value.DTCode+' - '+value.DescIssue, DTCode: value.DTCode, IssueTypeID: value.IssueTypeID,OutTypeID:value.OutTypeID,AssetID:value.AssetID }
    end

    render json: { success: true , data: result }
  end

  def getIssuesByIssueType
    issue_type_id = params[:issue_type_id]
    report_type = params[:report_type]
    is_out = params[:is_out]
    is_try_out1 = params[:is_try_out1]

    if !issue_type_id 
      data = ::V1::IssueService.find_most_used_issue(params, asset_id)
    else
      if is_out
        data = Issue.where(:IssueTypeID => issue_type_id ).where("DTCode !='' AND AssetID = ? AND Active = 1 AND OutTypeID = 1  ", asset_id)
      elsif  is_try_out1
        data = Issue.where(:IssueTypeID => issue_type_id ).where("DTCode !='' AND AssetID = ? AND Active = 1 AND OutTypeID = 2  ", asset_id)
      else
        #Easyremind #36665
        data = Issue.where(:IssueTypeID => issue_type_id).where("DTCode !='' AND AssetID = ? AND Active = 1 AND ShowTop5 != 0", asset_id)
      end
      #Easyremind #36665
      if report_type == 2
        data = Issue.where(:IssueTypeID => issue_type_id).where("COCode !='' AND AssetID = ? AND Active = 1", asset_id)
      end
    end
    result = []
    data.each do |value|
      if report_type == 1
        code = value.DTCode
      else
        code = value.COCode
      end
      if code != ''
        result << { id: value.ID, desc: code+' - '+value.DescIssue, code: code, area: value.IssueTypeID }
      end
    end
    render json: { "success": true, :data => result }
  end
end
