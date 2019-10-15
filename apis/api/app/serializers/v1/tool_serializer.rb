class V1::ToolSerializer < ActiveModel::Serializer
  attributes 'ID', 'ParentCode', 'DescTool', 'DesignSpeed', 'JobNumber'
end