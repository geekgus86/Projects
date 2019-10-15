class Group < ApplicationRecord
  self.table_name = 'admin.Group'

  has_many :teams, foreign_key: 'GroupID'
  belongs_to :user, foreign_key: 'GroupLeaderID'
  #has_many :shifts, foreign_key: 'GroupID'

  alias_attribute :leader, :user
end