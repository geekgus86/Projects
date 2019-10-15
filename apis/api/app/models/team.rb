class Team < ApplicationRecord
  self.table_name = "#{schema}Team"

  belongs_to :user, foreign_key: 'UserID'

end
