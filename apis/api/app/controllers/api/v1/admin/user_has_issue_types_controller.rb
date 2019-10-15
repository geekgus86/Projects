class Api::V1::Admin::UserHasIssueTypesController < ApplicationController
   
    def index 
        @user_has_issue_types = UserHasIssueType.all
        json_response(@user_has_issue_types)
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