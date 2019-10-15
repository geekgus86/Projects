# spec/integration/user_spec.rb
require 'swagger_helper'

########## 
describe 'User API' do

##########login#######

  path '/user/profile' do

    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
      
    post 'Profile' do
      tags 'Auth'
      consumes 'application/json', 'application/xml'
      parameter name: :Profile, in: :body, schema: {
        type: :object,
        properties: {
           
            }
        }    

      response '201', 'Profile' do
        let(:Profile) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:Login) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end

end
