class V1::EscalationTypeService
  def self.start_tracking(report_id, schema = "schulerA", asset_id = 1)
    @work_order_detail = WorkOrderDetail.find report_id
    data = @work_order_detail.attributes
    data[:statusStops] = 0
    data[:schema] = schema.gsub(".","")
    data[:AssetID] = asset_id
    data[:dbSchema] = {:DB => get_database, :schema => schema.gsub(".",""), :asset => schema }

    V1::EventBus::EventBusService.publish "metalsa/stops#{MQTT_ENV}", data

    data = {}
    data[:status] = true
    data[:schema] = schema.gsub(".","")
    data[:AssetID] = asset_id
    data[:dbSchema] = {:DB => get_database, :schema => schema.gsub(".",""), :asset => schema }

    V1::EventBus::EventBusService.publish "metalsa/changeover#{MQTT_ENV}", data
  end

  def self.stop_tracking(report_id, schema = "schulerA", asset_id = 1)
    @work_order_detail = WorkOrderDetail.find report_id
    data = @work_order_detail.attributes
    data[:statusStops] = 1
    data[:schema] = schema.gsub(".","")
    data[:AssetID] = asset_id
    data[:dbSchema] = {:DB => get_database, :schema => schema.gsub(".",""), :asset => schema  }

    V1::EventBus::EventBusService.publish "metalsa/stops#{MQTT_ENV}", data
    
    data = {}
    data[:status] = false
    data[:schema] = schema.gsub(".","")
    data[:AssetID] = asset_id
    data[:dbSchema] = {:DB => get_database, :schema => schema.gsub(".",""), :asset => schema  }

    V1::EventBus::EventBusService.publish "metalsa/changeover#{MQTT_ENV}", data
  end

  def self.get_database
    ActiveRecord::Base.connection.current_database
  end


  # def self.scale(report_id, level)
  #   @work_order_detail = WorkOrderDetail.find report_id
  #   current_level = @work_order_detail.escalation_rule['ID']
  #   if level > current_level
  #     @valid_escalation = EscalationRule.find level
  #     throw Error::EscalationLevelInvalidError unless @valid_escalation
  #     @work_order_detail.escalation_rule = @valid_escalation
  #     @work_order_detail.save
  #     # emmit escalationStart event
  #     # emmit user notification
  #     message = { user: 'someone', message: {hello: 'world!'}}
  #     V1::EventBus::EventBusService.publish 'metalsa/notification', message
  #   end
  # end
end
