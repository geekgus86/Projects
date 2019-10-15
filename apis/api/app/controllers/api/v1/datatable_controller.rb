class Api::V1::DatatableController < ApplicationController
	before_action :authenticate 
    def show
        render json: { data: { datos: ::V1::DatatableService.get_datatable(params, schema,prensa) }}
    end
end