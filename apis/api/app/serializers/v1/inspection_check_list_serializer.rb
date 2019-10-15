class V1::InspectionCheckListSerializer < ActiveModel::Serializer
  attributes 'DescInstrument',
             'Feature',
             'InstrumentCode',
             'Order',
             'Deviation',
             'Reference',
             'Spec',
             'Tolerance',
             'InferiorTolerance',
             'SuperiorTolerance',
             'InputType',
             'Image'
  belongs_to :tool
  belongs_to :instrument
end