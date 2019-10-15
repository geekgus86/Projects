class Sensor < ApplicationRecord
  self.table_name = "#{schema}Sensor"

  has_many :sensor_values, foreign_key: 'SensorID'
  belongs_to :sensor_type, foreign_key: 'SensorTypeID'
end
