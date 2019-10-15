module Error
  class ErrorHandler
    def self.included(clazz)
      clazz.class_eval do
        rescue_from ActiveRecord::RecordNotFound do |e|
          respond :record_not_fount, 404, e.to_s
        end
        rescue_from Error::SensaiError do |e|
          respond e.error, e.status, e.message
        end
      end
    end

    def respond(error, status, message)
      json = Helpers::Render.json error, status, message
      render json: json
    end
  end
end
