# spec/integration/datatable_spec.rb
require 'swagger_helper'

########## 
describe 'Datatables API' do

  ####### Check list 1 ##########
  path '/datatables/checkExternalCheckList?day={day}&type={type}&start_date={start_date}&end_date={end_date}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Datatables' do
      tags 'Datatables'
      produces 'application/json', 'application/xml'
      parameter name: :day, :in => :path, :type => :string
      parameter name: :type, :in => :path, :type => :string
      parameter name: :start_date, :in => :path, :type => :string
      parameter name: :end_date, :in => :path, :type => :string

      response '200', 'Datatables found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            datos:  { type: :array,
            items: {
              type: :object,
              properties: {
                Work_order:  { type: :integer  },
                ENN: { type: :integer  },
                Prensa: { type: :string  },
                Turno: { type: :number, format: :float  },
                Grupo: { type: :string },
                Team_Member: { type: :string  },
                Team_Leader: { type: :string  },
                Group_Leader: { type: :string  },
                Hora_Inicio: { type: :string  },
                Hora_Fin: { type: :string  },
                Categoria: { type: :string  },
                Revision: { type: :string  },
                Confirmacion: { type: :string  },
                Comentarios: { type: :string  },
                Estatus_Del_Checklist: { type: :string  },
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

