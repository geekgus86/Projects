class OutType < ApplicationRecord
    self.table_name = "#{schema}OutType"

    has_many :issues, foreign_key: 'OutTypeID'
    scope :by_InternalCode, -> (internalCode) { where(:InternalCode => internalCode) }

end