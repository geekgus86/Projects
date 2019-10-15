class Api::V1::JulianNumbersController < ApplicationController
  def show
    render json: ::V1::JulianNumberService.get_last_10(params[:id])
  end
end