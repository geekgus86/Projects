require 'api/validators'
module Api
  module UserModule
    extend ActiveSupport::Concern
    included do
      def_param_group :user do
        param :user, Hash, required: true do
          # param :email, Api::Validators::EMAIL, required: true
          param :email, String, required: true
          param :password, String, required: true
          param :os_id, String, required: false
        end
      end

      def_param_group :user_output do
        param :user, Hash, required: true do
          param :email, String, required: true
        end
      end
    end
  end
end
