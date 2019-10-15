module Auth::CurrentUser

  def logged_in?
    !!current_user
  end

  def current_user
    if auth_present? && auth
      # Nani?
      #User.uncached do
      #  @user = User.find_by(email: auth['sub'])
        @user = get_user auth['sub'] if @user.blank?
      #end
      if @user
        Auth::Current.user = @user
        return @user
      end
    end
  end

  def get_user user_name = "palacios"
    body = { username: user_name}
    #response = V1::Http::HttpService.request_get "post", "https://api-admin.azurewebsites.net/api/user/getByUsername", body
    response = V1::Http::HttpService.request_get "post", "http://i40appgateway.eastus.cloudapp.azure.com/admin/api/user/getByUsername", body
    user = if response.body.present?
      JSON.parse(response.body)
    else
      nil
    end
    return user
  end

  def authenticate_lib action
    exclude = ["getInfoShift","prepareProduction", "getRunningProduction","getCurrentFailure", "getOm", "pr_calculate"]
    repuest = exclude.include?(action)
    repuest = logged_in? unless repuest
    render json: { error: 'Unauthorized' }, status: 401 unless repuest
  end

  private

    def token
      request.env['HTTP_AUTHORIZATION'].scan(/Bearer(.*)$/).flatten.last.delete(' ')
    end

    def auth
      Auth::JsonWebToken.decode(token)
    end

    def auth_present?
      !!request.env.fetch('HTTP_AUTHORIZATION', '').scan(/Bearer(.*)$/).flatten.first
    end


end
