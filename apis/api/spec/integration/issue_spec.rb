# spec/integration/dailyreport_spec.rb
require 'swagger_helper'

########## 
describe 'Issue API' do

  ####### get Current Failure ##########
  path '/issue/110' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'Get a Issue' do
      tags 'Issue'
      produces 'application/json', 'application/xml'

      response '200', 'Issue found' do
        schema type: :object,
          properties: {
                ID:  { type: :integer  },
                IssueTypeID: { type: :integer  },
                DescIssue: { type: :string  },
                DTCode: { type: :string  },
                COCode: { type: :string },
                SBU: { type: :string  },
                CreatedAt: { type: :string  },
                CreatedBy: { type: :string  },
                UpdatedAt: { type: :string  },
                UpdatedBy: { type: :string  },
                Active: { type: :boolean  }
    }  
        run_test!
      end
  
      response '404', 'Issue not found' do
        let(:id) { 'invalid' }
        run_test!
      end
  
      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end

  ####### getAllIssues ##########
  path '/issue/getAllIssues' do
   
    parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

    get 'getAllIssues' do
      tags 'Issue'
      produces 'application/json', 'application/xml'

      response '200', 'Issue found' do
        schema type: :object,
          properties: {
                ID:  { type: :integer  },
                IssueTypeID: { type: :integer  },
                DescIssue: { type: :string  },
                DTCode: { type: :string  },
                COCode: { type: :string },
                SBU: { type: :string  },
                CreatedAt: { type: :string  },
                CreatedBy: { type: :string  },
                UpdatedAt: { type: :string  },
                UpdatedBy: { type: :string  },
                Active: { type: :boolean  }
    }  
        run_test!
      end
  
      response '404', 'Issue not found' do
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

path '/issue/getIssuesByIssueType' do

  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })
    
  post 'getIssuesByIssueType' do
    tags 'Issue'
    consumes 'application/json', 'application/xml'
    parameter name: :DailyReport, in: :body, schema: {
      type: :object,
      properties: {
        issue_type_id:    { type: :string },
        report_type:    { type: :string }
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

