class Issue < ApplicationRecord
  self.table_name = "#{schema}Issue"

  belongs_to :issue_type, foreign_key: 'IssueTypeID'
  belongs_to :out_type, foreign_key: 'OutTypeID', optional: true
  
  scope :by_asset, -> (asset_id) { where(:AssetID => asset_id) }
  scope :by_out_type, -> (out_type_code) { joins(:out_type).where( OutType: {InternalCode: out_type_code} ) }
  scope :only_out_type, -> () { where.not(OutTypeID: nil) } 

  def is_try_out
    return false unless self.out_type
    self.out_type.InternalCode == "TOUT"
  end
end
