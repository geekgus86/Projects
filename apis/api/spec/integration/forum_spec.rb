# spec/integration/report_spec.rb
require 'swagger_helper'

########## 
describe 'Forum API' do

##########forum#######

path '/forum/newComment' do
    
    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })

    post 'Forum new comment' do
      tags 'Forum'
      consumes 'application/json', 'application/xml'
      parameter name: :Forum, in: :body, schema: {
        type: :object,
        properties: {
            id:    { type: :integer },
            data:    { type: :string },
            user:    { type: :string },
            'type':    { type: :integer }
 
    }
}

      response '201', 'Forum' do
        let(:Forum) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:Forum) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end


end