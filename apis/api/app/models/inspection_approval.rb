class InspectionApproval < ApplicationRecord
  self.table_name = "#{schema}InspectionApproval"

  belongs_to :inspection, foreign_key: 'InspectionID', optional: true
  belongs_to :inspection_check_list, foreign_key: 'InspectionCheckID'
end