class SensorValue < ApplicationRecord
  self.table_name = "#{schema}SensorValue"
  belongs_to :sensor, foreign_key: 'SensorID'
end
