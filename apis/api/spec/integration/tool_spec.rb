# spec/integration/tool_spec.rb
require 'swagger_helper'

########## 
describe 'Tool API' do

  ####### Check list 1 ##########
  path '/tool' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Tool' do
      tags 'Tool'
      produces 'application/json', 'application/xml'

      response '200', 'KPIs found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :array,
            items: {
              type: :object,
              properties: {
                ID:  { type: :integer  },
                DescTool: { type: :string  },
                ParentCode: { type: :string  },
                DesignSpeed: { type: :number, format: :float  },
                ObjectiveID: { type: :number, format: :float  },
                JobNumber: { type: :number, format: :float },
                CreatedAt: { type: :string  },
                CreatedBy: { type: :string  },
                UpdatedAt: { type: :string  },
                UpdatedBy: { type: :string  },
                Active: { type: :number, format: :float },
                ToolType: { type: :number, format: :float },
                NoRollo: { type: :number, format: :float },
                PzPerStroke: { type: :number, format: :float },
                }
              }
            }
        },
          required: [ 'startDay', 'endDay' ]
  
        run_test!
      end
  
      response '404', 'KPIs not found' do
        let(:id) { 'invalid' }
        run_test!
      end
  
      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

  ##########getbyCode#######

path '/tools/getByCode?code{code}' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'getByCode' do
    tags 'Tool'
    consumes 'application/json', 'application/xml'
    parameter name: :code, in: :header, schema: {
      type: :object,
      properties: {
        code:    { type: :string }
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


  ####### getByFilter ##########
  path '/tools/getByFilter?{expression}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'getByFilter' do
      tags 'Tool'
      produces 'application/json', 'application/xml'
      parameter name: :expression, :in => :path, :type => :string

      response '200', 'KPIs found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :array,
            items: {
              type: :object,
              properties: {
                ID:  { type: :integer  },
                DescTool: { type: :string  },
                ParentCode: { type: :string  },
                DesignSpeed: { type: :number, format: :float  },
                ObjectiveID: { type: :number, format: :float  },
                JobNumber: { type: :number, format: :float },
                CreatedAt: { type: :string  },
                CreatedBy: { type: :string  },
                UpdatedAt: { type: :string  },
                UpdatedBy: { type: :string  },
                Active: { type: :number, format: :float },
                ToolType: { type: :number, format: :float },
                NoRollo: { type: :number, format: :float },
                PzPerStroke: { type: :number, format: :float },
                }
              }
            }
        },
          required: [ 'startDay', 'endDay' ]
  
        run_test!
      end
  
      response '404', 'KPIs not found' do
        let(:id) { 'invalid' }
        run_test!
      end
  
      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end



end

