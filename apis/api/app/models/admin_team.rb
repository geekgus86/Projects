class AdminTeam < ApplicationRecord
  self.table_name = "admin.Team"

  has_many :users, foreign_key: 'TeamID'
  belongs_to :user, foreign_key: 'TeamLeaderID'
  belongs_to :group, foreign_key: 'GroupID'
  alias_attribute :leader, :user

end
