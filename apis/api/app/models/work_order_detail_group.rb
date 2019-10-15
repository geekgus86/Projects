class WorkOrderDetailGroup < ApplicationRecord
  self.table_name = "#{schema}WorkOrderDetailGroup"

  #belongs_to :work_order_detail, foreign_key: 'WorkOrderDetailID'
  belongs_to :parent, foreign_key: 'ParentID', class_name: 'WorkOrderDetail'
  belongs_to :issue, foreign_key: 'IssueID', optional: true

  has_many :work_order_details, class_name: 'WorkOrderDetail'

  # after_create :recalculate_pr

  # def recalculate_pr
  #   issue_type = IssueType.joins(:issues).where(:issue => {:ID => self.IssueID}, :ID => 5).count
  #   if issue_type.present?
  #     start_at = self.StartAt.strftime("%Y-%m-%dT%H:00:00")
  #     end_at = Time.now.in_time_zone("UTC").strftime("%Y-%m-%dT%H:59:59")
  #     WorkOrderDetail.calculate_pr(start_at, end_at, self.AssetID)
  #   end
  # end
  
end
