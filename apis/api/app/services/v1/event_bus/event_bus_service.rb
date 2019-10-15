class V1::EventBus::EventBusService

  def self.publish(topic, message)
    stringified_message = message
    stringified_message = message.to_json unless message.is_a?(String)
    client.publish(topic, stringified_message )
  end

  def self.client
    MQTT::Client.connect('mqtts://carlos:C4RL0$@10.1.3.4:8443')
  end
end



