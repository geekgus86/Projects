class Shift < ApplicationRecord
  self.table_name = "admin.Shift"

  belongs_to :group, foreign_key: 'GroupID'
  belongs_to :shift_type, foreign_key: 'ShiftTypeID'
end