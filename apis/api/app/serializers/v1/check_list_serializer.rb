class V1::CheckListSerializer < ActiveModel::Serializer
  attributes  'CreatedAt', 'DescCheckList'
  has_many :check_list_answers
end