class V1::IssueService
  class << self
    def find_most_used_issue(issue_params, asset_id)
      most_used_issues = WorkOrderDetail.by_asset(asset_id).only_top_5.where(EscalationTypeID: issue_params[:report_type]).where('IssueID is not null').group(:IssueID).order('count_IssueID DESC').limit(5).count(:IssueID)
      
      puts '--------------------------------'
      puts most_used_issues.to_json
      @issues = Issue.find most_used_issues.keys
      @issues
    end
  end
end