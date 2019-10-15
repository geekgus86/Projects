class CheckList < ApplicationRecord
  self.table_name = "#{schema}CheckList"

  belongs_to :check_list_type, foreign_key: 'CheckListTypeID'
  belongs_to :work_order, foreign_key: 'WorkOrderID', optional: true
  belongs_to :user, foreign_key: 'UserID', optional: true
  belongs_to :tool, foreign_key: 'ToolID', optional: true
  has_many :check_list_sections, foreign_key: 'CheckListID'
  has_many :check_list_answers, foreign_key: 'CheckListID'

  scope :shift_answers, ->(date1, date2, checklist_id,asset_id ) { where('StartAt >= ? AND StartAt <= ? AND CheckListTypeID = ? AND AssetID = ?', date1, date2, checklist_id,asset_id ) }

  accepts_nested_attributes_for :check_list_answers, :allow_destroy => true

  scope :by_type, ->(type){ where(:CheckListTypeID => type)}
  scope :by_tool, ->(tool_id){ where(ToolID: tool_id) }
  scope :by_group, ->(group){ joins(:user => :team).where(:Team => {:GroupID => group})}
end
