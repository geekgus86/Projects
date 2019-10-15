class V1::InspectionCheckListService
  class << self
    def get_inspection_check_lists(inspection_check_list_params)
      @inspection_check_lists = InspectionCheckList.where(ToolID: inspection_check_list_params[:id])
      inspection_check_lists = @inspection_check_lists.as_json
      inspection_check_lists.each  do |inspection_check_list|
        instrument_id = inspection_check_list['InstrumentID']
        inspection_check_list['Instrument'] = Instrument.find(instrument_id) if instrument_id
        inspection_check_list['Tool'] = Tool.find inspection_check_list['ToolID']
        inspection_check_list.delete 'InstrumentID'
        inspection_check_list.delete 'ToolID'
      end
      mapped_inspection_check_lists = []
      inspection_check_lists.each do |inspection_check_list|
        mapped_inspection_check_lists.push(new_mapped_inspection_check_list(inspection_check_list))
      end
      mapped_inspection_check_lists
    end

    def new_mapped_inspection_check_list(inspection_check_list)
      new_inspection_check_list = Utils::MapObject.map_object(inspection_check_list, INSPECTION_MAP)
      instrument = inspection_check_list['Instrument'].as_json
      instrument['DescInstrument'] = instrument['DescInstrument'].strip if instrument
      new_inspection_check_list['instrumento'] = Utils::MapObject.map_object(instrument, Instrument.map) if instrument
      new_inspection_check_list
    end

    INSPECTION_MAP = {
        ID: 'id',
        DescInstrument: 'instrumentLbl',
        Feature: 'caracteristica',
        InstrumentCode: 'codigo',
        Order: 'order',
        Deviation: 'desviacion',
        Reference: 'referencia',
        Spec: 'especificacion',
        Tolerance: 'tolerancia',
        InferiorTolerance: 'tolerancia_inf',
        SuperiorTolerance: 'tolerancia_sup',
        InputType: 'input_type',
        Image: 'image',
        Consecutive: 'numero',
        Tool: 'herramienta',
        Instrument: 'instrumento'
    }

  end
end