class WorkOrder < ApplicationRecord
  self.table_name = "#{schema}WorkOrder"

  after_create :publish_new_work_order

  has_many :work_order_details, foreign_key: 'WorkOrderID'
  has_many :daily_work_orders, foreign_key: 'WorkOrderID'
  has_many :check_lists, foreign_key: 'WorkOrderID'
  belongs_to :tool, foreign_key: 'ToolID'
  has_many :work_order_logs, foreign_key: 'WorkOrderID'
  has_many :inspections, foreign_key: 'WorkOrderID'
  belongs_to :asset , class_name: 'Asset', foreign_key: 'AssetID', optional: true

  scope :between_date, ->(date1, date2) { where('StartAt >= ? AND EndAt <= ?', date1, date2) }
  scope :by_tool_code, ->(code) { joins(:tool).where(tool: { DescTool: code }) }
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
  scope :by_tool, -> (tool_id){ where(:ToolID => tool_id) }

  
  def self.get_data(start_date = '2018-10-02 12:00:00', end_date = '2018-10-02 16:00:00', asset_id = 1)
    #add getData in workorders
    data_return = []
    WorkOrder.includes(:tool).where(StartAt: start_date..end_date, AssetID: asset_id).each do |w|
      result = w.attributes
      tool = w.try(:tool)
      if tool
        result['Tool'] = tool.DescTool
      end
      data_return << result
    end
    data_return
  end

  private

    def publish_new_work_order
      # maybe publish to event queue?
      # This will publish into MQTT the
      # created instance
      tool = self.attributes
      tool[:AssetID] = self.AssetID
      tool[:dbSchema] = {:DB => get_database, :schema => schema.gsub(".", ""), :asset => self.asset.Name}
      V1::EventBus::EventBusService.publish('metalsa/newWorkOrder', tool )
    end
end
