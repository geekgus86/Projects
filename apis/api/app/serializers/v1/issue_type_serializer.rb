class V1::IssueTypeSerializer < ActiveModel::Serializer
  attributes 'DescIssueType', 'ShortDesc', 'Color', 'RealDown'
  has_many :issues
end