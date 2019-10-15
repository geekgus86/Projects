class V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :photo, :employee_id, :tadi
end