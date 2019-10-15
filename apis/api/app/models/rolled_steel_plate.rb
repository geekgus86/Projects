class RolledSteelPlate < ApplicationRecord
  self.table_name = "#{schema}RolledSteelPlate"

  has_many :daily_work_orders, foreign_key: 'RolledSteelPlateID'
end
