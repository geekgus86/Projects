class V1::RolledSteelPlateSerializer < ActiveModel::Serializer
  attributes 'ID', 'ProdRollID', 'BatchRoll'
  has_many :daily_work_orders
end