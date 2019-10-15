# spec/integration/shift_spec.rb
require 'swagger_helper'

describe 'Shift API' do

############# GET KPIS                #############
  path '/shifts?day={day}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Shift' do
      tags 'Shift'
      produces 'application/json', 'application/xml'
      parameter name: :day, :in => :path, :type => :string

      response '200', 'Shift found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data: { type: :object,
            properties: {
                shifts: { type: :object,
                properties: {
                    shifts: { type: :object,
                    properties: {
                        '1': { type: :object,
                        properties: {
                            Description: { type: :string },
                            startAt: { type: :string },
                            endAt: { type: :string },
                            startAtUTC: { type: :string },
                            endAtUTC: { type: :string },
                            duration: { type: :integer }
                        }
                        },
                        '2': { type: :object,
                            properties: {
                                Description: { type: :string },
                                startAt: { type: :string },
                                endAt: { type: :string },
                                startAtUTC: { type: :string },
                                endAtUTC: { type: :string },
                                duration: { type: :integer }
                            }
                        }
                    } 
                },
                rangeShift: { type: :object,
                properties: {
                    startAt: { type: :string },
                    endAt: { type: :string },
                    startAtUTC: { type: :string },
                    endAtUTC: { type: :string }
                }
            },
            actualShift: { type: :object,
            properties: {
                startAt: { type: :string },
                endAt: { type: :string },
                startAtUTC: { type: :string },
                endAtUTC: { type: :string }
            }
        },
        previousShift: { type: :object,
        properties: {
            startAt: { type: :string },
            endAt: { type: :string },
            startAtUTC: { type: :string },
            endAtUTC: { type: :string }
        }
    },
    timezone: { type: :string }
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

##########comment#######

path '/shift/comment' do
    
    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })

    post 'Shift comment' do
      tags 'Shift'
      consumes 'application/json', 'application/xml'
      parameter name: :Forum, in: :body, schema: {
        type: :object,
        properties: {
            machine_id:    { type: :integer },
            comment:    { type: :string }
 
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


  ####### getMachineChecklist #######
path '/shift/updateLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'Shift updateLog' do
    tags 'Shift'
    consumes 'application/json', 'application/xml'
    parameter name: :Shift, in: :body, schema: {
      type: :object,
      properties: {
        log_id: {type: :integer},
        comment: {type: :string}
          }
      }    
  
    response '201', 'Profile' do
      let(:Shift) { { type: 'foo', title: 'available' } }
      run_test!
    end
  
    response '422', 'invalid request' do
      let(:Shift) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
  end  

   ####### deleteLog #######
path '/shift/deleteLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'Shift deleteLog' do
    tags 'Shift'
    consumes 'application/json', 'application/xml'
    parameter name: :Shift, in: :body, schema: {
      type: :object,
      properties: {
        log_id: {type: :string}
          }
      }    
  
    response '201', 'Profile' do
      let(:Shift) { { type: 'foo', title: 'available' } }
      run_test!
    end
  
    response '422', 'invalid request' do
      let(:Shift) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
  end  

end