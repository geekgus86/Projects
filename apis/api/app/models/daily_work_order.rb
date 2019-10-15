class DailyWorkOrder < ApplicationRecord
  self.table_name = "#{schema}DailyWorkOrder"

  belongs_to :work_order, foreign_key: 'WorkOrderID', optional: true
  belongs_to :work_order_detail, foreign_key: 'WorkOrderDetailID', optional: true
  belongs_to :tool, foreign_key: 'ToolID', optional: true
  belongs_to :rolled_steel_plate, foreign_key: 'RolledSteelID', optional: true
  belongs_to :issue, foreign_key: 'IssueID', optional: true
  belongs_to :daily_work_order_status, foreign_key: 'DailyStatusID'

  scope :between_date, ->(date1, date2) { where('StartAt >= ? AND EndAt <= ?', date1, date2 ) }
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }

end
