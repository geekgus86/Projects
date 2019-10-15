class Asset < ApplicationRecord
  self.table_name = "admin.Asset"

  scope :by_name, ->(name_asset) { where('Name = ?', name_asset) }

  def self.get_default_name
    Asset.first.Name
  end

  def self.get_asset asset_name
    Asset.find_by_Name(asset_name)
  end

end
