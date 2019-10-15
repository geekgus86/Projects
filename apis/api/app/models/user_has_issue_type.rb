class UserHasIssueType < ApplicationRecord
  self.table_name = "#{schema}UserHasIssueType"

  belongs_to :user, foreign_key: 'user_id'
  belongs_to :issue_type, foreign_key: 'issue_type_id'
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }

  
end
