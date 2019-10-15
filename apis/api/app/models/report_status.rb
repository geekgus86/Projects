class ReportStatus < ApplicationRecord
  self.table_name = "#{schema}ReportStatus"

  has_many :work_order_details, foreign_key: 'ReportStatusID'
  has_many :work_order_logs, foreign_key: 'ReportStatusID'
end
