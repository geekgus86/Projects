class Api::V1::SensorValueController < ApplicationController
  before_action :authenticate

    def get_sensors
        result = []
        Sensor.all.each do |sensor|
            data = {}
            data = sensor.attributes
            begin
                lastSensor = sensor.sensor_values.order(CreatedAt: :desc).first
                data[:Value] = lastSensor.Value
                data[:dateLastUpdated] = lastSensor.CreatedAt
            end
            result << data
        end

        render json: result
    end

    def get_values_log	
        result = SensorValue.where(SensorID: params[:id]).order(CreatedAt: :asc).limit(params[:l]).as_json
        result.each do |r|
            r["Value"] = r["Value"].round(2)
        end
        render json: result
    end
end