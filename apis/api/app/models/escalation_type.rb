class EscalationType < ApplicationRecord
  self.table_name = "#{schema}EscalationType"
  has_one :escalation_rule, foreign_key: 'EscalationTypeID'
  has_many :work_order_details, foreign_key: 'EscalationTypeID'
end
