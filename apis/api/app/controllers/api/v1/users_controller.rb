class Api::V1::UsersController < ApplicationController
  before_action :authenticate

  def profile
    render json: { success: true, data: ::V1::UserService.get_profile }
  end
end