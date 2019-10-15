class LengthType < ApplicationRecord
  self.table_name = "admin.LengthType"

  has_many :shift_types, foreign_key: 'LengthTypeID'
end