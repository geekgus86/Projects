class ShiftType < ApplicationRecord
  self.table_name = 'admin.ShiftType'

  has_many :shifts, foreign_key: 'ShiftTypeID'
  belongs_to :length_type, foreign_key: 'LengthTypeID'
end