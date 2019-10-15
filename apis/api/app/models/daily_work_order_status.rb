class DailyWorkOrderStatus < ApplicationRecord
  self.table_name = "#{schema}DailyWorkOrderStatus"
  has_many :daily_work_orders, foreign_key: 'DailyStatusID'
end
