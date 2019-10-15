class V1::ReportStatusSerializer < ActiveModel::Serializer
  attributes 'DescStatus'
  has_many :work_order_details
end