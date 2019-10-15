# spec/integration/report_spec.rb
require 'swagger_helper'

########## 
describe 'Report API' do

##########login#######

path '/report/getOm' do
    
    parameter({
        :in => :header,
        :type => :string,
        :name => :Authorization,
        :required => true,
        :description => 'Client token'
      })

    post 'Report' do
      tags 'Report'
      consumes 'application/json', 'application/xml'
      parameter name: :Report, in: :body, schema: {
        type: :object,
        properties: {
            val1:    { type: :string },
            val2:    { type: :string }
 
    },
    required: [ 'val1', 'val2' ]
}

      response '201', 'Report' do
        let(:Report) { { type: 'foo', title: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:Report) { { type: 'foo', title: 'available' } }
        run_test!
      end
    end
  end

##########escalation Log#######

path '/report/escalationLog' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'escalationLog' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        reportId:    { type: :integer }

  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########Manual Escalation#######

path '/report/manualEscalation' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'escalationLog' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        reportId:    { type: :integer }

  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########Manual Assist#######

path '/report/manualAssist' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'manualAssist' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        reportId:    { type: :integer },
        tadi:    { type: :string }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########Get Report#######

path '/report/getReport' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'getReport' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        reportId:    { type: :integer }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########get Historic#######

path '/report/getHistoric' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'getReport' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        reportId:    { type: :integer }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end


##########get Historic#######

path '/report/getLog' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'getLog' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        machine_id:    { type: :integer },
        shift:    { type: :integer }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########mergeDowntimes#######

path '/report/mergeDowntimes' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'mergeDowntimes' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        current:    { type: :string },
        list:    { type: :string }

  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########splitDowntimes#######

path '/report/splitDowntimes' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'mergeDowntimes' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        list:    { type: :string }

  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end

##########getLog#######

path '/report/getLog' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'getLog' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        machine_id:    { type: :string },
        shift:    { type: :string },
        day:    { type: :string }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end


##########assignFailure#######

path '/report/assignFailure' do
    
  parameter({
      :in => :header,
      :type => :string,
      :name => :Authorization,
      :required => true,
      :description => 'Client token'
    })

  post 'assignFailure' do
    tags 'Report'
    consumes 'application/json', 'application/xml'
    parameter name: :Report, in: :body, schema: {
      type: :object,
      properties: {
        report_id:    { type: :string },
        issue_id:    { type: :string },
        report_type:    { type: :string },
        loteRollo:    { type: :string }
  }
}

    response '201', 'Report' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end

    response '422', 'invalid request' do
      let(:Report) { { type: 'foo', title: 'available' } }
      run_test!
    end
  end
end





end