# spec/integration/hourproduction_spec.rb
require 'swagger_helper'

########## 
describe 'HourProduction API' do

##########getInfoShift#######

path '/hourproduction/getInfoShift' do
    
    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })

    post 'Get new comment' do
      tags 'hourproduction'
      consumes 'application/json', 'application/xml'
      parameter name: :hourproduction, in: :body, schema: {
        type: :object,
        properties: {
            day:    { type: :string }
 
    }
}

      response '201', 'hourproduction' do
        let(:hourproduction) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:hourproduction) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end


end