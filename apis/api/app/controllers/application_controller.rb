class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  before_action :setSchema
  before_action :set_locale

  include Auth::CurrentUser
  #helper_method :schema

  def authenticate
    authenticate_lib params[:action]
  end

  def get_database
    ActiveRecord::Base.connection.current_database
  end

  def only_schema
    #is_development? ? "apo_schulerA" :"#{request.env['SCHEMA_NAME']}"
    request.headers["HTTP_SCHEMA"].present? ? request.headers["HTTP_SCHEMA"] : get_default_name
  end
  

  def schema    
    request.env['SCHEMA_NAME'] || get_default_name
  end

  def prensa
    pr = request.headers["HTTP_SCHEMA"] 
    label = 'Schuler A'
    if pr == 'apo_schulerB'
        label = 'Schuler B'
    end
    if pr == 'et_k15'
        label = 'K15'
    end
    if pr == 'et_k14'
        label = 'K14'
    end
    if pr == 'apo_fagorA'
      label = 'Fagor A'
    end
    if pr == 'apo_fagorB'
      label = 'Fagor B'
    end
    if pr == 'et_k3'
      label = 'K3'
    end
    if pr == 'et_k4'
      label = 'K4'
    end
    if pr == 'et_k1'
      label = 'K1'
    end
    if pr == 'et_k2'
      label = 'K2'
    end
    if pr == 'et_k9'
      label = 'K9'
    end
    if pr == 'apo_jinan'
      label = 'Jinan'
    end
    if pr == 'apo_k1200'
      label = 'K1200'
    end
    if pr == 'et_k5'
      label = 'K5'
    end
    if pr == 'et_k6'
      label = 'K6'
    end
    if pr == 'et_k7'
      label = 'K7'
    end
    if pr == 'et_k8'
      label = 'K8'
    end

		
    request.headers["HTTP_PRENSA"] = label
  end
  
  def asset_id 
    setSchema
  end

  def get_default_name
    Asset.get_default_name
  end

  def is_development?
    Rails.env == "development" 
  end
    
  def set_locale                
    begin
      Rails.logger.info "----> #{current_user}"
      locale = Locale.find_by(id: current_user[:LocaleID])
      I18n.locale = locale.Acronym
    rescue => ex
      I18n.locale = I18n.default_locale
    end        
  end

  #private

  def setSchema
    Rails.logger.info "----> #{only_schema}"
    asset = Asset.get_asset only_schema
    ApplicationRecord.set_timezone (asset.try(:time_zone) || "America/Monterrey")
    asset.id
  end
end
