# spec/integration/dailyreport_spec.rb
require 'swagger_helper'

########## 
describe 'DailyReport API' do

  ####### get Current Failure ##########
  path '/dailyreport/prepareProduction' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a DailyReport' do
      tags 'DailyReport'
      produces 'application/json', 'application/xml'

      response '200', 'DailyReport found' do
        schema type: :object,
          properties: {
            success: { type: :boolean },
            data:  { type: :object,
              properties: {
                ID:  { type: :integer  },
                WorkOrderID: { type: :integer  },
                WorkOrderDetailID: { type: :integer  },
                UnitAuto: { type: :integer  },
                UnitManual: { type: :integer },
                UnitPotential: { type: :integer  },
                UnitScrap: { type: :integer  },
                UnitRework: { type: :integer  },
                ToolID: { type: :integer  },
                DesignSpeed: { type: :integer  },
                JulianCode: { type: :integer  },
                RolledSteelID: { type: :integer  },
                RolledNo: { type: :integer  },
                RolledLot:  { type: :integer  },
                DailyStatusID: { type: :string  },
                StartAt: { type: :string  },
                EndAt: { type: :string  },
                CreatedAt: { type: :string },
                CreatedBy: { type: :string  },
                UpdatedAt: { type: :string  },
                UpdatedBy: { type: :string  },
                Active: { type: :boolean  },
                LoteBlanco: { type: :string  },
                OpenSecond: { type: :string  },
                WorkOrderDetail: { type: :integer  },
                tool:  { type: :object,
                properties: {
                    ID:  { type: :integer  },
                    DescTool: { type: :string  },
                    ParentCode: { type: :string  },
                    DesignSpeed: { type: :integer  },
                    ObjectiveID: { type: :integer },
                    JobNumber: { type: :integer  },
                    CreatedAt: { type: :string  },
                    CreatedBy: { type: :string  },
                    UpdatedAt: { type: :string  },
                    UpdatedBy: { type: :string  },
                    Active: { type: :boolean  },
                    ToolType: { type: :integer  },
                    NoRollo: { type: :integer  },
                    PzPerStroke: { type: :integer  },
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

##########editValidatedProduction#######

path '/dailyreport/editValidatedProduction' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'editValidatedProduction' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        id:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

 ####### getValidatedProduction ##########
 path '/dailyreport/getValidatedProduction' do
   
  parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })

  get 'getValidatedProduction' do
    tags 'DailyReport'
    produces 'application/json', 'application/xml'

    response '200', 'DailyReport found' do
      schema type: :object,
        properties: {
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


 ####### getVerifiedProduction ##########
 path '/dailyreport/getVerifiedProduction' do
   
  parameter({
    :in => :header,
    :type => :string,
    :name => :Authorization,
    :required => true,
    :description => 'Client token'
  })

  get 'getVerifiedProduction' do
    tags 'DailyReport'
    produces 'application/json', 'application/xml'

    response '200', 'DailyReport found' do
      schema type: :object,
        properties: {
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


##########editValidatedProduction#######

path '/dailyreport/validateProduction' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'validateProduction' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production_id:    { type: :string },
        setup_status:    { type: :string },
        report_id:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########editValidatedProduction#######

path '/dailyreport/verifyProduction' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'verifyProduction' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production:    { type: :string },
        data:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########getLog#######

path '/dailyreport/getLog' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'getLog' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        day:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########setCurrentTool#######

path '/dailyreport/setCurrentTool' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'setCurrentTool' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production:    { type: :string },
        tool:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########closeProduction#######

path '/dailyreport/closeProduction' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'closeProduction' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production:    { type: :string },
        data:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end


##########setChangeoverReqs#######

path '/dailyreport/setChangeoverReqs' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'setChangeoverReqs' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production:    { type: :string },
        reqs:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########setToolsParams#######

path '/dailyreport/setToolsParams' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'setToolsParams' do
    tags 'DailyReport'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        production:    { type: :string },
        data:    { type: :string }
          }
}

    response '201', 'Login' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:DailyReport) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

end

