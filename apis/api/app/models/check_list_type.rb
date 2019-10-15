class CheckListType < ApplicationRecord
  self.table_name = "#{schema}CheckListType"
  has_many :check_lists, foreign_key: 'CheckListTypeID'
  has_many :check_list_sections, foreign_key: 'CheckListTypeID'
end
