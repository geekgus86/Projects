require 'rails_helper'

RSpec.describe Api::V1::IssueController, type: :request do
  # Leaving this as a comment for now
  # Must be uncommented in the future
  # The database now has data in it
  # let :issues do
  #   create_list(:issue, 5)
  # end

  describe 'GET /issues' do
    it 'should get all existing issues' do
      login
      get '/api/v1/issue/getAllIssues', headers: get_token_header(response)
      # for now
      expect(response.parsed_body['data'].length).to be > 0
    end
  end
end
