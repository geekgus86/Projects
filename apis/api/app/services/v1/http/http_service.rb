require 'json'
module V1
  module Http
    class HttpService
      class << self
        def request(method, url, path, headers, body)
          headers['Content-Type'] = 'application/json' unless headers.key?('Content-Type')
          headers['Accept'] = 'application/json' unless headers.key?('Accept')
          connection = Faraday.new url: url
          connection.public_send(method) do |request|
            request.url path
            request.body = body.to_json
            request.headers = headers
          end
        end

        def request_get(method, url, body = nil, headers = {})
          headers['Content-Type'] = 'application/json' 
          #headers['Accept'] = 'application/json' unless headers.key?('Accept')
          connection = Faraday.new url: url
          connection.public_send(method) do |request|
            #request.url path
            request.body = body.to_json if body.present?
            request.headers = headers if headers.present?
          end
        end
      end
    end
  end
end
