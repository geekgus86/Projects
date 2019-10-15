class Tool < ApplicationRecord
  self.table_name = "#{schema}Tool"

  has_many :work_orders, foreign_key: 'ToolID'
  has_many :work_order_details, foreign_key: 'ToolID'
  has_many :daily_work_orders, foreign_key: 'ToolID'
  has_many :work_order_by_hours, foreign_key: 'ToolID'
  has_many :inspections, foreign_key: 'ToolID'

  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
  scope :only_active, -> {where(Active: 1)}
  scope :get_smart_tools, -> (asset_id){ Prodtrack.execute_procedure('Admin.getSmartTools', assetID: asset_id) }

end
