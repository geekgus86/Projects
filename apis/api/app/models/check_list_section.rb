class CheckListSection < ApplicationRecord
  self.table_name = "#{schema}CheckListSection"
  belongs_to :check_list, foreign_key: 'CheckListID'
  has_many :check_questions, foreign_key: 'CheckListSectionID'

  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
end
