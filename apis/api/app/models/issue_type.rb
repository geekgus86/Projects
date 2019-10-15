class IssueType < ApplicationRecord
  self.table_name = "#{schema}IssueType"

  has_many :issues, foreign_key: 'IssueTypeID'
  has_many :user_has_issue_types, foreign_key: 'issue_type_id'
  has_many :users, through: :user_has_issue_types
  #FIXME Analizar esto, Tiempos Fuera
  scope :only_area, -> { where("ID <> 5 and ID <> 12") }
  scope :enabled, -> {where(:Active => true)}
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
end
