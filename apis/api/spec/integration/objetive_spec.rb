# spec/integration/objetive_spec.rb
require 'swagger_helper'

########## 
describe 'objective API' do

 
##########login#######

  path '/objective/getObjective' do

    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
      
    post 'getObjective' do
      tags 'objective'
      consumes 'application/json', 'application/xml'
      parameter name: :Login, in: :body, schema: {
        type: :object,
        properties: {
            tool: {type: :string}
        }    
}

      response '201', 'Login' do
        let(:Login) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:Login) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end




end
