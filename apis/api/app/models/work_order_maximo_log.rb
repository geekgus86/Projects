class WorkOrderMaximoLog < ApplicationRecord
    self.table_name = "#{schema}WorkOrderMaximoLog"
    
    belongs_to :work_order_maximo, foreign_key: 'wom_id', optional: true
    
end