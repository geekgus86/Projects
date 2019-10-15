require 'api/user_module'
class Api::V1::Auth::AuthController < ApplicationController
  before_action :authenticate, only: [:logout]
  resource_description do
    api_versions '1'
  end

  include Api::UserModule

  api :POST, '/auth/login', 'Logs in an existing user'
  param_group :user
  formats ['json']
  api_version '1'
  description 'Logs in a user and generates a signed JWT for application usage'
  # To be implemented :/
  returns :user_output, desc: 'The logged in user'
  def login
    @login_params = ::V1::Auth::AuthService.login(login_params)
    render json: @login_params, status: @login_params[:status]
  end

  def verify
    render json: { message: 'Authorized' }, status: 200 unless authenticate
  end

  def sign_up
    # Register new user
    render json: { hello: 'world' }
  end

  def logout
    render json: { success: true, data: ::V1::Auth::AuthService.logout }
  end

  def checkLogin
    render json: { success: true, data: ::V1::Auth::AuthService.checkLogin }
  end

  private
    def login_params
      params.require(:user).permit(:email, :password, :os_id, :push_token)
    end

    def sign_up_params
      # Required params for sign up
    end

end