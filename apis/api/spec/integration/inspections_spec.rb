# spec/integration/inspections_spec.rb
require 'swagger_helper'

describe 'Inspection API' do

############# GET Reports Of The Day                #############
path '/hourproduction/getReportsOfTheDay' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'get Reports Of The Day' do
      tags 'Inspections'
      produces 'application/json', 'application/xml'

      response '200', 'Inspections found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :array,
            items: {
              type: :object,
              properties: {
                reportId: { type: :integer },
                id: { type: :integer },
                color: { type: :string },
                createdAt: { type: :string },
                closedAt: { type: :string },
                limitMin: { type: :string },
                limitMax: { type: :string },
                report_type: { type: :integer },
                report_status: { type: :integer },
                name: { type: :string },
                desc: { type: :string },
                code: { type: :string },
                diff: { type: :number, format: :float },
                report_number: { type: :integer },
                report_division: { type: :string },
                has_parent: { type: :boolean },
                is_grouped: { type: :boolean }
               }
            }   
        }    
    }
        
        run_test!
      end

      response '404', 'Integration not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end


############# get Week Production                #############
  path '/hourproduction/getWeekProduction' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Inspections' do
      tags 'Inspections'
      produces 'application/json', 'application/xml'

      response '200', 'Inspections found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :array,
            items: {
              type: :object,
              properties: {
                fecha: { type: :string },
                diaFinal: { type: :string },
                turno: { type: :string },
                sumPiezas: { type: :integer }
               }
            }   
        }    
    }
        
        run_test!
      end

      response '404', 'Integration not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

  ############# get Last Record Production                #############
  path '/hourproduction/getLastRecordProduction' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Inspections' do
      tags 'Inspections'
      produces 'application/json', 'application/xml'

      response '200', 'Inspections found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
              data: { type: :object,
              properties: {
                fecha: { type: :string },
                gspm: { type: :integer },
                golpes: { type: :integer },
                oaxpr_perc: { type: :integer },
                dataql: { type: :object,
                properties: {
                    fechaInicio: { type: :string },
                    fechaProduccion: { type: :string },
                    fechaCierre: { type: :string },
                    sumPiezas: { type: :integer },   
                    sumPiezasPotenciales: { type: :integer }
                }
            },       
              dataq2: { type: :object,
              properties: {
                  tnd: { type: :integer }
                }
            }    
        }
    }
    }
        
        run_test!
      end

      response '404', 'Integration not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end



   ############# get Last Record Production                #############
   path '/inspections/{toolID}/actual' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a actual' do
      tags 'Inspections actual'
      produces 'application/json', 'application/xml'
      parameter name: :toolID, :in => :path, :type => :string

      response '200', 'Inspections found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
              data: { type: :object,
              properties: {
                fecha: { type: :string },
                gspm: { type: :integer },
                golpes: { type: :integer },
                oaxpr_perc: { type: :integer },
                dataql: { type: :object,
                properties: {
                    fechaInicio: { type: :string },
                    fechaProduccion: { type: :string },
                    fechaCierre: { type: :string },
                    sumPiezas: { type: :integer },   
                    sumPiezasPotenciales: { type: :integer }
                }
            },       
              dataq2: { type: :object,
              properties: {
                  tnd: { type: :integer }
                }
            }    
        }
    }
    }
        
        run_test!
      end

      response '404', 'Integration not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end


  ############# get Last Record Production                #############
  path '/inspections/{toolID}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a actual' do
      tags 'Inspections'
      produces 'application/json', 'application/xml'
      parameter name: :toolID, :in => :path, :type => :string

      response '200', 'Inspections found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
              data: { type: :object,
              properties: {
                fecha: { type: :string },
                gspm: { type: :integer },
                golpes: { type: :integer },
                oaxpr_perc: { type: :integer },
                dataql: { type: :object,
                properties: {
                    fechaInicio: { type: :string },
                    fechaProduccion: { type: :string },
                    fechaCierre: { type: :string },
                    sumPiezas: { type: :integer },   
                    sumPiezasPotenciales: { type: :integer }
                }
            },       
              dataq2: { type: :object,
              properties: {
                  tnd: { type: :integer }
                }
            }    
        }
    }
    }
        
        run_test!
      end

      response '404', 'Integration not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end


    ############# get approval          #############
    path '/inspections/{id}/approval' do
   
      parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })
  
      get 'Get a approval' do
        tags 'Inspections'
        produces 'application/json', 'application/xml'
        parameter name: :id, :in => :path, :type => :string
  
        response '200', 'Inspections found' do
          schema type: :object,
            properties: {
              success: { type: :boolean },
                data: { type: :object,
                properties: {
                  fecha: { type: :string },
                  gspm: { type: :integer },
                  golpes: { type: :integer },
                  oaxpr_perc: { type: :integer },
                  dataql: { type: :object,
                  properties: {
                      fechaInicio: { type: :string },
                      fechaProduccion: { type: :string },
                      fechaCierre: { type: :string },
                      sumPiezas: { type: :integer },   
                      sumPiezasPotenciales: { type: :integer }
                  }
              },       
                dataq2: { type: :object,
                properties: {
                    tnd: { type: :integer }
                  }
              }    
          }
      }
      }
          
          run_test!
        end
  
        response '404', 'Integration not found' do
          let(:id) { 'invalid' }
          run_test!
        end
  
        response '406', 'unsupported accept header' do
          let(:'Accept') { 'application/foo' }
          run_test!
        end
      end
    end


############# get report          #############
        path '/inspections/report/{work_order_id}' do
   
          parameter({
            :in => :header,
            :type => :string,
            :name => :Authorization,
            :required => true,
            :description => 'Client token'
          })
      
          get 'Get a report' do
            tags 'Inspections'
            produces 'application/json', 'application/xml'
            parameter name: :work_order_id, :in => :path, :type => :string
      
            response '200', 'Inspections found' do
              schema type: :object,
                properties: {
                  success: { type: :boolean },
                    data: { type: :object,
                    properties: {
                      fecha: { type: :string },
                      gspm: { type: :integer },
                      golpes: { type: :integer },
                      oaxpr_perc: { type: :integer },
                      dataql: { type: :object,
                      properties: {
                          fechaInicio: { type: :string },
                          fechaProduccion: { type: :string },
                          fechaCierre: { type: :string },
                          sumPiezas: { type: :integer },   
                          sumPiezasPotenciales: { type: :integer }
                      }
                  },       
                    dataq2: { type: :object,
                    properties: {
                        tnd: { type: :integer }
                      }
                  }    
              }
          }
          }
              
              run_test!
            end
      
            response '404', 'Integration not found' do
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

