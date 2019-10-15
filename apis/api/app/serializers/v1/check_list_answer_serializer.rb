class V1::CheckListAnswerSerializer < ActiveModel::Serializer
  attributes  'Answer', 'Comment'
  #belongs_to :check_list
  belongs_to :check_list_section
  belongs_to :check_question
  #belongs_to :asset
end