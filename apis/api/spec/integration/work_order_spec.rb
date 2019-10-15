# spec/integration/work_order_spec.rb
require 'swagger_helper'

########## 
describe 'Work Order API' do

  ####### getLastsByTool ##########
  path '/workorders/getLastsByTool/{tool_id}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'getLastsByTool' do
      tags 'Work Order'
      produces 'application/json', 'application/xml'
      parameter name: :tool_id, :in => :path, :type => :string

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

