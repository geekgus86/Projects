class EscalationRule < ApplicationRecord
  self.table_name = "#{schema}EscalationRule"
  belongs_to :escalation_type, foreign_key: 'EscalationTypeID'
  has_many :work_order_details, foreign_key: 'WorkOrderDetailID'
end
