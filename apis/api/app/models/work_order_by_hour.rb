class WorkOrderByHour < ApplicationRecord
  self.table_name = "#{schema}WorkOrderByHour"

  belongs_to :tool, foreign_key: 'ToolID'
  scope :between_date, ->(date1, date2) { where('StartAt >= ? AND EndAt <= ?', date1, date2) }
  scope :by_start_date, ->(date1) { where('StartAt >= ?', date1) }
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }

  def self.process_hours(start_date, end_date, asset_id = 1)
    Prodtrack.execute_procedure('Admin.getHxh', startDate: start_date, endDate: end_date, timezone: 0, assetID: asset_id )
  end

  def self.get_data start_date, end_date, asset_id = 1
  	WorkOrderByHour.by_asset(asset_id).by_start_date(start_date)
  end

  def self.get_data_between_date(start_date, end_date, asset_id = 1) 
    WorkOrderByHour.by_asset(asset_id).between_date(start_date, end_date)
  end

end
