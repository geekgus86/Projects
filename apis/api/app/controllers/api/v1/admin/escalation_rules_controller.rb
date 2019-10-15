class Api::V1::Admin::EscalationRulesController < ApplicationController
    def index 
        @escalation_rules = EscalationRule.all
        json_response(@escalation_rules)
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