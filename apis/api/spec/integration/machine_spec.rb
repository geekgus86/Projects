# spec/integration/machine_spec.rb
require 'swagger_helper'

########## 
describe 'Machine API' do

  ####### get Current Failure ##########
  path '/machine/getCurrentFailure' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Failure' do
      tags 'Machine'
      produces 'application/json', 'application/xml'

      response '200', 'Datatables found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :object,
              properties: {
                report:  { type: :object,
                properties: {
                    id:  { type: :integer  },
                    createdAt: { type: :string  },
                    EndAt: { type: :string  },
                    issue: { type: :string  },
                    escalationLevel: { type: :integer },
                    report_type: { type: :integer  },
                    desc: { type: :string  },
                    code: { type: :string  },
                    color: { type: :string  },
                    name: { type: :string  },
                    issueType: { type: :string  },
                    extraDowntime: { type: :integer  },
                    issue_type: { type: :string  },
                }
            },
                escalation:  { type: :object,
                properties: {
                    id:  { type: :integer  },
                    level: { type: :integer  },
                    limit: { type: :integer  },
                    label: { type: :string  },
                    type: { type: :integer },
                    color: { type: :string  }
                } 
            }
          }
        }    
    }  
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

 ####### getMachineChecklist #######
 path '/machine/getMachineChecklist' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Machine Checklist' do
    tags 'Machine'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        checklist_type: {type: :integer}
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

####### getMachineChecklist #######
path '/machine/getMachineChecklist' do

parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })
  
post 'get Machine Checklist' do
  tags 'Machine'
  consumes 'application/json', 'application/xml'
  parameter name: :Checklist, in: :body, schema: {
    type: :object,
    properties: {
    machine_id: {type: :integer},
    checklist_type: {type: :integer}
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

####### getMachineChecklist #######
path '/machine/getMachineChecklist' do

parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })
  
post 'get Machine Checklist' do
  tags 'Machine'
  consumes 'application/json', 'application/xml'
  parameter name: :Checklist, in: :body, schema: {
    type: :object,
    properties: {
    machine_id: {type: :integer},
    checklist_type: {type: :integer}
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

####### getMachineCheckin #######
path '/machine/checkin' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Machine checkin' do
    tags 'Machine'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        iot_tag: {type: :string},
        schema: {type: :string},
        user_id: {type: :string}
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

    ####### get Checkout ##########
    path '/machine/checkout' do
   
      parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
  
      get 'Get a Failure' do
        tags 'Machine'
        produces 'application/json', 'application/xml'
  
        response '200', 'Datatables found' do
          schema type: :object,
            properties: {
              success: { type: :boolean },
              data:  { type: :object,
                properties: {
                  checkListStatus:  { type: :string  },
                  initialChecklist: { type: :string  },
                  timer: { type: :string  },
                  timer_answers: { type: :string  },
                  changeOverCheckList: { type: :string },
                  schema: { type: :string  },
                  machine: { type: :string  }
        }
      }
    }
    
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

####### updateLog #######
path '/machine/updateLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Machine updateLog' do
    tags 'Machine'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        log_id: {type: :string},
        comment: {type: :string}
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

####### deleteLog #######
path '/machine/deleteLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'get Machine deleteLog' do
    tags 'Machine'
    consumes 'application/json', 'application/xml'
    parameter name: :Checklist, in: :body, schema: {
      type: :object,
      properties: {
        log_id: {type: :string}
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

