class Instrument < ApplicationRecord
  self.table_name = "#{schema}Instrument"

  has_many :inspection_check_lists, foreign_key: 'InstrumentID'

  def self.map
    {
        Physical: 'physical',
        DescInstrument: 'title',
        Service: 'service',
        Picture: 'picture',
        Features: 'characteristic'
    }
  end
end