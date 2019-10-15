class V1::IssueSerializer < ActiveModel::Serializer
  attributes 'ID', 'DescIssue', 'DTCode'
  belongs_to :issue_type
end