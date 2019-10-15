class CheckQuestion < ApplicationRecord
  self.table_name = "#{schema}CheckQuestion"
  belongs_to :check_list_section, foreign_key: 'CheckListSectionID'

end
