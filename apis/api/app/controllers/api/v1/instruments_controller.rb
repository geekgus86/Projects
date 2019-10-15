class Api::V1::InstrumentsController < ApplicationController
  def index
    render json: { success: true, data: ::V1::InstrumentService.get_instruments }
  end
end