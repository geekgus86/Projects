class V1::InstrumentService
  class << self
    def get_instruments
      @instruments = Instrument.all
      mapped_instruments = []
      @instruments.each do |instrument|
        mapped_instruments.push(Utils::MapObject.map_object(instrument.as_json, Instrument.map))
      end
      mapped_instruments.each do |instrument|
        instrument['title'] = instrument['title'].strip
      end
      mapped_instruments
    end
  end
end