module Error
  class SensaiError < StandardError
    attr_reader :error, :status, :message

    def initialize(error = nil, status = nil, message = nil)
      @error = error || 500
      @status = status || :unprocessable_entity
      @message = message || 'Hubo un error procesando su solicitud'
    end

    def get_json
      Helpers::Render.json error, message, status
    end
  end
end
