class V1::Auth::AuthService

  include ::V1::EventBus::Channels

  def self.login(login_params)
    tok = V1::Notifications::PushNotificationsService.get_notification_token login_params['push_token'], login_params['os_id']
    body = { usuario: login_params[:email], password: login_params[:password], 
    notification: tok, push: login_params['push_token']
  }
    headers = { Authorization: "Bearer" }
    #response = V1::Http::HttpService.request 'post', 'https://complete-release.azurewebsites.net', '/api/users/autenticar/', headers, body
    response = V1::Http::HttpService.request 'post', 'http://i40appgateway.eastus.cloudapp.azure.com', '/auth/api/users/autenticar/', headers, body
    tokenF = JSON.parse(response.body)['token']
    if tokenF 
      tadiUsable = Auth::JsonWebToken.decode(tokenF)['cardNumber']
      @user = User.find_by(tadi: tadiUsable)
      if !@user
        @user = User.new
        #@user.role = Role.new
        @user.locale = Locale.new
        #@user.role_id = 3
        #@user.TeamID = 1
        @user.LocaleID = 1
        #@user.lnguage = 'en'
        @user.tadi = tadiUsable
        @user.password_digest = BCrypt::Password.create(login_params[:password])
      end
      @user.name = JSON.parse(response.body)['name']
      @user.username = login_params['email']
      @user.email = login_params['email']
      @user.os_id = login_params['os_id']
      @user.push_token = login_params['push_token']
      is_web_log_in = !login_params['os_id'] && !login_params['push_token']
      @user.notification_token = V1::Notifications::PushNotificationsService.get_notification_token @user.push_token, @user.os_id
      jwt = Auth::JsonWebToken.issue({user: @user.as_json})
      @user.LocaleID = JSON.parse(response.body)['locale'].to_i
      profile = @user.as_json
      profile['foto'] = { thumbnailUrl: nil }
      profile['aro'] = @user.role_id
      profile['language'] = JSON.parse(response.body)['locale'] == '1' ? 'es' : 'en'
      @user.os_id = profile['notification_token']
      profile['id'] = JSON.parse(response.body)['id']
      # @user.save
      @token_user = User.where(push_token: @user.push_token).where.not(id: @user.id)
      @token_user.each do |user|
        user.notification_token = nil
        user.push_token = nil
        user.os_id = nil
        user.save
      end
      @user.save
      Rails.logger.info "---------------------------------"
      Rails.logger.info @user.errors.full_messages
      data1 = { AppInfo: nil, Profile: profile, UserLogin: { token: tokenF}, status: 200 } 
      data1[:dbSchema] = {:DB => true, :schema => 'Admin'}
      ::V1::EventBus::EventBusService.publish('metalsa/userLogin', data1) unless is_web_log_in
      data1
    else
      #password error
      { err: 'Password error', status: 401, type: 'password' }
    end
        
  end

  def self.sign_up(sign_up_params)

  end

  def self.checkLogin
    current_user = Auth::Current.user
    @user = User.find_by(id: current_user[:id])
    if @user
      profile = @user.as_json
      profile['foto'] = { thumbnailUrl: nil }
      #profile['aro'] = @user.role.id
      jwt = Auth::JsonWebToken.issue({user: @user.as_json})
      { AppInfo: nil, Profile: profile, UserLogin: { token: jwt }, status: 200 } 
    end
  end

  def self.logout
    current_user = Auth::Current.user
    current_user.update(
      {
        notification_token: nil,
        push_token: nil,
        os_id: nil
      }
    )
    # Force the current user to be nil
    # This way we can be sure that
    # the next user is a new logged in one
    Auth::Current.user = nil
 end
end
