class Api::V1::EasyRedMineController < ApplicationController
	before_action :authenticate 
    def setComment
        render json: ::V1::EasyRedMineService.setComment(params)
    end
end
