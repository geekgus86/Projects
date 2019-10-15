module Helpers
  module Authentication
    def login
      # login to the app
      post '/api/v1/auth/login', params: { user: { email: 'necho', password: 'necho' } }.as_json
    end

    def get_token_header(response)
      { Authorization: "Bearer #{response.parsed_body['UserLogin']['token']}" }
    end
  end
end
