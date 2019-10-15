class Role < ApplicationRecord
  self.table_name = 'admin.Role'

  has_many :users
end