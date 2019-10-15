class Api::V1::Admin::UsersController < ApplicationController

    def index 
        @users = User.all
        json_response(@users)
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