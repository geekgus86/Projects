class Inspection < ApplicationRecord
  self.table_name = "#{schema}Inspection"

  belongs_to :tool, foreign_key: 'ToolID'
  belongs_to :user, foreign_key: 'InspectorID'
  has_many :inspection_approvals, foreign_key: 'InspectionID'

  accepts_nested_attributes_for :inspection_approvals
end