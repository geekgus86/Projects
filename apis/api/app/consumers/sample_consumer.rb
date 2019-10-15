require 'mqtt'
# Remember to add all consumers
# to loader.rb file. That way,
# they can be initialized
class SampleConsumer
  def on_message(topic, message)
    # do something
    puts "#{topic}: #{message}"
  end

  def initialize
    Thread.new do
      loop do
        begin
          client = MQTT::Client.connect('mqtts://carlos:C4RL0$@testing.sensai.net:8443')
          client.subscribe('metalsa/sampling')
          client.get do |topic, message|
            on_message topic, message
          end
        end
      end
    end
  end
end
