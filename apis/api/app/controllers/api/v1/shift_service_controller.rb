class Api::V1::ShiftServiceController < ApplicationController
	before_action :authenticate 
    def show
        render json: { success: true, data: { shifts: ::V1::SensaiShifts.get_shifts(only_schema, params[:day]) } }
    end
end