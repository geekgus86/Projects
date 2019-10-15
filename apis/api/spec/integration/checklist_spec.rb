# spec/integration/checklist_spec.rb
require 'swagger_helper'

########## 
describe 'Checklist API' do

  path '/api/v1/checklists' do
    post 'Creates a Checklist' do
      tags 'Checklist'
      consumes 'application/json', 'application/xml'
      parameter name: :Checklist, in: :body, schema: {
        type: :object,
        properties: {
          type: { type: :string },
          title: { type: :string },
          sections: {
          type: :array,
          items: {
             type: :string
            }            
          }        
        },
        required: [ 'type', 'title' ]
      }


      response '201', 'Checklist created' do
        let(:Checklist) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:Checklist) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end

  ####### Check list 1 ##########
  path '/checklist/1?group={group}&start_date={start_date}&end_date={end_date}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Checklist' do
      tags 'Checklist'
      produces 'application/json', 'application/xml'
      parameter name: :group, :in => :path, :type => :integer
      parameter name: :start_date, :in => :path, :type => :string
      parameter name: :end_date, :in => :path, :type => :string

      response '200', 'KPIs found' do
        schema type: :object,
          properties: {
            data: { type: :object,
            properties: {
              datos: { type: :object,
              properties: {
                header: { type: :object,
                properties: {
                  data:  { type: :array,
                  items: {}
                        }
                   }
                  },
                datos: { type: :object,
                properties: {
                   
                   }
                  }
                }   
              }   
            }
          }
        },
          required: [ 'startDay', 'endDay' ]

        #let(:data) { Pet.create(totalOutTime: 'foo', totalStrokes: 'bar').data }
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


  ####### Check list 2 ##########
  path '/checklist/2?type={type}&tool={tool}&end_date={end_date}&start_date={start_date}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Checklist' do
      tags 'Checklist'
      produces 'application/json', 'application/xml'
      parameter name: :type, :in => :path, :type => :integer
      parameter name: :tool, :in => :path, :type => :integer
      parameter name: :end_date, :in => :path, :type => :string
      parameter name: :start_date, :in => :path, :type => :string

      response '200', 'Checklist found' do
        schema type: :object,
          properties: {
            data: { type: :object,
            properties: {
              datos: { type: :object,
              properties: {
                header: { type: :object,
                properties: {
                  data:  { type: :array,
                  items: {}
                        }
                   }
                  },
                datos: { type: :object,
                properties: {
                   
                   }
                  }
                }   
              }   
            }
          }
        },
          required: [ 'startDay', 'endDay' ]

        #let(:data) { Pet.create(totalOutTime: 'foo', totalStrokes: 'bar').data }
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

 ####### Save #######
 path '/checklist/save' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Machine Checklist' do
    tags 'Checklist'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        user_id: {type: :integer},
        checklist_id: {type: :integer},
        machine_id: {type: :integer},
        shift: {type: :integer},
        answers: {type: :integer}
          }
      }    

    response '201', 'Profile' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end  


 ####### getChecklistAnswers #######
 path '/checklist/getChecklistShift' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Check list Shift' do
    tags 'Checklist'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        shift: {type: :integer}
          }
      }    

    response '201', 'Profile' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end  

 ####### save log #######
 path '/checklist/saveLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'save log' do
    tags 'Checklist'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        tadi:    { type: :string},
        start:   { type: :string},
        end:     { type: :string},
        user:    { type: :string},
        machine: { type: :string}
          }
      }    

    response '201', 'Profile' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Checklist) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end  

end

