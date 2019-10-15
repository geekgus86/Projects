# spec/integration/sensor_value_spec.rb
require 'swagger_helper'

describe 'Sensor API' do

############# GET om                #############
  path '/sensor_value/get_sensors' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get Sensors' do
      tags 'Sensors'
      produces 'application/json', 'application/xml'

      response '200', 'Sensor found' do
        schema type: :array,
        items: {
            type: :object,
          properties: {
            ID: { type: :integer },
            DescSensor: { type: :string },
            SensorTypeID: { type: :integer },
            AssetID: { type: :integer },
            MinValue: { type: :number, format: :float },
            MaxValue: { type: :number, format: :float },
            CMinValue: { type: :number, format: :float },
            CMaxValue: { type: :number, format: :float },
            Reference: { type: :string },
            DataTag: { type: :string },
            DataType: { type: :string },
            Unit: { type: :string },
            Location: { type: :string },
            FunctionType: { type: :string },
            UseCase: { type: :string },
            HWarning: { type: :integer },
            HCritical: { type: :integer },
            CreatedAt: { type: :string },
            CreatedBy: { type: :string },
            UpdatedAt: { type: :number, format: :float },
            UpdatedBy: { type: :number, format: :float },
            Active: { type: :boolean },
            Value: { type: :integer },
            dateLastUpdated: { type: :string }
            }
        }
    
        run_test!
      end

      response '404', 'Daily not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

############# GET Real Strokes Header  #############
path '/daily_production_reports/get_real_strokes_header?val1={val1}&val2={val2}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'GET Real Strokes Header' do
      tags 'Daily Production Report'
      produces 'application/json', 'application/xml'
      parameter name: :val1, :in => :path, :type => :string
      parameter name: :val2, :in => :path, :type => :string

      response '200', 'API found' do
        schema type: :object,
          properties: {
            time_tnr: { type: :number, format: :float },
            workorder: { type: :number, format: :float },
            ID: { type: :number, format: :float },
            tool: { type: :number, format: :float },
            golpes: { type: :number, format: :float },
            golpesp: { type: :number, format: :float },
            scrap: { type: :number, format: :float },
            retrabajo: { type: :number, format: :float },
            Minutos: { type: :number, format: :float },
            RealSpeed: { type: :number, format: :float },
            ShiftID: { type: :number, format: :float },
            gspm: { type: :number, format: :float },
            percentageOaPr: { type: :number, format: :float },
            minCo: { type: :number, format: :float },
            percentageCo: { type: :number, format: :float },
            eventCo: { type: :number, format: :float },
            paros: { type: :number, format: :float },
            IssueID: { type: :number, format: :float },
            IssueTypeID: { type: :number, format: :float },
            changeover: { type: :number, format: :float },
            OutTime: { type: :number, format: :float },
            tnd: { type: :number, format: :float },
            veldis: { type: :number, format: :float },
            dateperiod: { type: :number, format: :float },
            ttaSum: { type: :number, format: :float },
            percentageTtaSum: { type: :number, format: :float },
            percentageTnr: { type: :number, format: :float },
            mttrProm: { type: :number, format: :float },
            totalMcp: { type: :number, format: :float },
            percentageMcp: { type: :number, format: :float }
        },
        required: [ 'val1', 'val2' ]

        run_test!
      end

      response '404', 'Daily not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

############# GET om                #############
path '/daily_production_reports/get_shift_detail?val1={val1}&val2={val2}' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'GET Shift Detail' do
      tags 'Daily Production Report'
      produces 'application/json', 'application/xml'
      parameter name: :val1, :in => :path, :type => :string
      parameter name: :val2, :in => :path, :type => :string

      response '200', 'API found' do
        schema type: :array,
        items: {
            type: :object,
          properties: {
            workOrderID: { type: :number, format: :float },
            tools: { type: :string },
            paros: { type: :number, format: :float },
            golpes: { type: :number, format: :float },
            scrap: { type: :number, format: :float },
            retrabajo: { type: :number, format: :float },
            Minutos: { type: :number, format: :float },
            RealSpeed: { type: :number, format: :float },
            changeover0: { type: :number, format: :float },
            OutTime: { type: :number, format: :float },
            veldis: { type: :number, format: :float },
            tnd: { type: :number, format: :float },
            gspm: { type: :number, format: :float },
            golpesP: { type: :number, format: :float },
            percentageOaPr: { type: :number, format: :float },
            changeover: { type: :number, format: :float },
            velRealTT: { type: :integer },
            num_juliano: { type: :integer },
            dateperiod: { type: :string }
            }
        },
        required: [ 'val1', 'val2' ]

        run_test!
      end

      response '404', 'Daily not found' do
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

