class InspectionCheckList < ApplicationRecord
  self.table_name = "#{schema}InspectionCheckList"

  belongs_to :instrument, foreign_key: 'InstrumentID'
  belongs_to :tool, foreign_key: 'ToolID'
end