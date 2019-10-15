class CheckListAnswer < ApplicationRecord
  self.table_name = "#{schema}CheckListAnswer"

  belongs_to :work_order, foreign_key: 'WorkOrderID', optional: true
  belongs_to :check_list, foreign_key: 'CheckListID', optional: true
  belongs_to :check_list_section, foreign_key: 'CheckListSectionID', optional: true
  belongs_to :check_question, foreign_key: 'CheckListQuestionID', optional: true

  scope :shift_answers, ->(date1, date2, checklist_id, asset_id) { where('CreatedAt >= ? AND CreatedAt <= ? AND CheckListSectionID = ? AND AssetID = ?', date1, date2, checklist_id, asset_id) }
end
