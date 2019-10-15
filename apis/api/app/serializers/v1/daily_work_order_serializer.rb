class V1::DailyWorkOrderSerializer < ActiveModel::Serializer
  attributes 'ID', 'UnitAuto', 'UnitScrap', 'UnitPotential', 'OpenSecond', 'StartAt', 'EndAt'
  has_one :work_order_detail
  belongs_to :tool
  belongs_to :rolled_steel_plate
  #belongs_to :julian_number
  #belongs_to :asset
end