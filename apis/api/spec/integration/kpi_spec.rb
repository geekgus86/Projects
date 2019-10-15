# spec/integration/kpi_spec.rb
require 'swagger_helper'

describe 'KPIs API' do

############# GET KPIS                #############
  path '/kpi/getKpis?startDay={startDay}&endDay={endDay}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a KPIs' do
      tags 'KPI'
      produces 'application/json', 'application/xml'
      parameter name: :startDay, :in => :path, :type => :string
      parameter name: :endDay, :in => :path, :type => :string

      response '200', 'KPIs found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data: { type: :object,
            properties: {
                totalOutTime: { type: :number, format: :float },
                totalStrokes: { type: :integer },
                potentialStrokes: { type: :number, format: :float },
                oapr: { type: :number, format: :float },
                tpco: { type: :integer },
                tcr: { type: :string },
                gsph: { type: :number, format: :float },
                coEvents: { type: :integer },
                coMinutes: { type: :integer },
                avgCoMins: { type: :integer },
                percentageCo: { type: :number, format: :float },
                dtMinutes: { type: :integer },
                percentageDt: { type: :number, format: :float },
                tnr: { type: :number, format: :float },
                tnd: { type: :number, format: :float },
                mttrProm: { type: :integer },
                ansAvgTime: { type: :string }
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


############# GET Shift Kpis          #############

  path '/kpi/getShiftKpis?startDay={startDay}&endDay={endDay}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get shift KPIs' do
      tags 'KPI'
      produces 'application/json', 'application/xml'
      parameter name: :startDay, :in => :path, :type => :string
      parameter name: :endDay, :in => :path, :type => :string

      response '200', 'KPIs shift found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data: { type: :array,
            items: {
              type: :object,
            properties: {
                oapr: { type: :number, format: :float },
                gspm: { type: :number, format: :float },
                strokes: { type: :integer },
                avgCo: { type: :number, format: :float },
                potentialStrokes: { type: :integer },
                tnd: {  type: :number, format: :float  },
                minCo: { type: :number, format: :float },
                eventCo: { type: :integer },
                title: { type: :string }
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

############# GET Afectaciones Eqes   #############

   path '/kpi/getAfectacionEqes?startDay={startDay}&endDay={endDay}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get Afectaciones Eqes' do
      tags 'KPI'
      produces 'application/json', 'application/xml'
      parameter name: :startDay, :in => :path, :type => :string
      parameter name: :endDay, :in => :path, :type => :string

      response '200', 'KPIs shift found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data: { type: :array,
            items: {
              type: :object,
            properties: {
                id: { type: :integer },
                name: { type: :string },
                color: { type: :string },
                afect: { type: :number, format: :float },
                objectiveDt: { type: :number, format: :float },
                dt_minutes: {  type: :number, format: :float  },
                co_minutes: { type: :number, format: :float },
                tnrPct: { type: :number, format: :float },
                tnrMin: { type: :number, format: :float }
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

############# GET Global Indicators   #############

     path '/kpi/getGlobalIndicators?startDay={startDay}&endDay={endDay}' do
   
      parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
  
      get 'Get Global Indicators' do
        tags 'KPI'
        produces 'application/json', 'application/xml'
        parameter name: :startDay, :in => :path, :type => :string
        parameter name: :endDay, :in => :path, :type => :string
  
        response '200', 'KPIs shift found' do
          schema type: :object,
            properties: {
              success: { type: :boolean },
              data: { type: :object,
              properties: {
                  oapr: { type: :number, format: :float  },
                  co: { type: :number, format: :float  },
                  dt: { type: :number, format: :float  },
                  microparos: { type: :number, format: :float }
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

############# GET Paretos Downtime    #############

         path '/kpi/getParetosDowntime?startDay={startDay}&endDay={endDay}' do
   
          parameter({
            :in => :header,
            :type => :string,
            :name => :Authorization,
            :required => true,
            :description => 'Client token'
          })
      
          get 'Get Paretos Downtime' do
            tags 'KPI'
            produces 'application/json', 'application/xml'
            parameter name: :startDay, :in => :path, :type => :string
            parameter name: :endDay, :in => :path, :type => :string
      
            response '200', 'KPIs found' do
              schema type: :object,
                properties: {
                  success: { type: :boolean },
                  data: { type: :array,
                  items: {
                    type: :object,
                  properties: {
                      issue:  { type: :integer  },
                      dtCode: { type: :string  },
                      coCode: { type: :string  },
                      desc:   { type: :string  },
                      color:  { type: :string  },
                      issue_count:     { type: :integer  },
                      issue_minutes:   { type: :number, format: :float  },
                      percentage:      { type: :number, format: :float  },
                      tools: { type: :array,
                      items: {
                            type: :object,
                            properties: {
                                  issue:     { type: :integer  },
                                  tool_code: { type: :string  },
                                  issue_minutes: { type: :number, format: :float  },
                                  percentage:    { type: :number, format: :float  }
                            }
                         }
                       }
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


############# GET Paretos Changeover  #############
  path '/kpi/getParetosChangeover?startDay={startDay}&endDay={endDay}' do
    
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get Paretos Changeover' do
      tags 'KPI'
      produces 'application/json', 'application/xml'
      parameter name: :startDay, :in => :path, :type => :string
      parameter name: :endDay, :in => :path, :type => :string

      response '200', 'KPIs shift found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :array,
            items: {
              type: :object,
              properties: {
                  issue:  { type: :integer  },
                  dtCode: { type: :string  },
                  coCode: { type: :string  },
                  desc:   { type: :string  },
                  color:  { type: :string  },
                  issue_count:     { type: :integer  },
                  issue_minutes:   { type: :number, format: :float  },
                  percentage:      { type: :number, format: :float  },
                  tools: { type: :array,
                  items: {
                        type: :object,
                        properties: {
                              issue:     { type: :integer  },
                              tool_code: { type: :string  },
                              issue_minutes: { type: :number, format: :float  },
                              percentage:    { type: :number, format: :float  }
                        }
                    }
                  }
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

############# GET tools Changeover    #############
path '/kpi/getToolsChangeover?startDay={startDay}&endDay={endDay}' do
    
  parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })

  get 'get Tools Changeover' do
    tags 'KPI'
    produces 'application/json', 'application/xml'
    parameter name: :startDay, :in => :path, :type => :string
    parameter name: :endDay, :in => :path, :type => :string

    response '200', 'KPIs found' do
      schema type: :object,
        properties: {
          success: { type: :boolean },
          data:  { type: :array,
          items: {
            type: :object,
            properties: {
                tool_id:  { type: :integer  },
                tool_code: { type: :string  },
                coCode: { type: :string  },
                items: { type: :array,
                items: {
                      type: :object,
                      properties: {
                            issue_type:       { type: :string  },
                            issue_type_color: { type: :string  },
                            issue_minutes:    { type: :number, format: :float   },
                            issue_type_id:    { type: :integer }
                      }
                  }
                },
                total_issue_minutes:  { type: :number, format: :float  },
                total_events: { type: :integer  },
                percentageTime: { type: :number, format: :float },
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

############# GET Tools Performance   #############
path '/kpi/getToolsPerformance?startDay={startDay}&endDay={endDay}' do
   
  parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })

  get 'Get Tools Performance' do
    tags 'KPI'
    produces 'application/json', 'application/xml'
    parameter name: :startDay, :in => :path, :type => :string
    parameter name: :endDay, :in => :path, :type => :string

    response '200', 'KPIs found' do
      schema type: :object,
        properties: {
          success: { type: :boolean },
          data: { type: :array,
          items: {
            type: :object,
          properties: {
              tool: { type: :string },
              strokes: {type: :integer},
              potentialStrokes: {type: :number, format: :float},
              tnd: {type: :number, format: :float},
              total_strokes: { type: :integer },
              oapr: { type: :integer },
              gspm: { type: :integer },
              color: { type: :string }
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

############# GET Hour Strokes    #############
path '/kpi/getHourStrokes?day={day}' do
    
  parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })

  get 'get Hour Strokes' do
    tags 'KPI'
    produces 'application/json', 'application/xml'
    parameter name: :day, :in => :path, :type => :string

    response '200', 'KPIs found' do
      schema type: :object,
        properties: {
          success: { type: :boolean },
          data:  { type: :array,
          items: {
            type: :object,
            properties: {
                hour:  { type: :string  },
                total_strokes: { type: :integer  },
                potential_strokes: { type: :integer  },
                oapr: { type: :integer  },
                tools: { type: :array,
                items: { type: :string
                  }
                },
                color:  { type: :string  },
                formatedHour: { type: :string  }
              }
            }
          }
      },
        required: [ 'day' ]

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

