class Api::V1::Admin::AssetsController < ApplicationController
    def index 
        @assets = Asset.all
        json_response(@assets)
    end

    # def show
    # end

    # def create
    # end
    
    # def update
    # end

    # def destroy
    # end

end