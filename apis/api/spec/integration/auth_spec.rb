# spec/integration/auth_spec.rb
require 'swagger_helper'

########## 
describe 'Auth API' do

  ####### Check list 1 ##########
  path '/auth/verify/' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Auth' do
      tags 'Auth'
      produces 'application/json', 'application/xml'

      response '200', 'Auth found' do
        schema type: :object,
          properties: {
            message: { type: :boolean }
              }

        run_test!
      end
  
      response '404', 'Auth not found' do
        let(:id) { 'invalid' }
        run_test!
      end
  
      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

##########login#######

  path '/auth/login' do

    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
      
    post 'Login' do
      tags 'Auth'
      consumes 'application/json', 'application/xml'
      parameter name: :Login, in: :body, schema: {
        type: :object,
        properties: {
            user: { 
                type: :object,
            properties: {
                email:    { type: :string },
                password: { type: :string }
            }
        }    
    },
    required: [ 'email', 'password' ]
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

##########checkLogin#######

path '/auth/checkLogin' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'checkLogin' do
    tags 'Auth'
    consumes 'application/json', 'application/xml'
    parameter name: :Login, in: :body, schema: {
      type: :object,
      properties: {
        sessionData:    { type: :string }
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
