class InstrumentSerializer < ActiveModel::Serializer
  attributes 'DescInstrument', 'Physical', 'Service', 'Pictures'
end