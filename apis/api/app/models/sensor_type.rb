class SensorType < ApplicationRecord
  self.table_name = "#{schema}SensorType"

  has_many :sensors, foreign_key: 'SensorTypeID'
end
