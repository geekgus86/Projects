class Api::V1::VersionAppController < ApplicationController
	#before_action :authenticate 
    def check
        render json: ::V1::VersionAppService.check(params)
    end
end