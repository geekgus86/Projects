module Utils
  class MapObject
    def self.map_object(object_to_map, map_to_use)
      new_map = {}
      map_to_use.keys.each do |key|
        new_map[map_to_use[key]] = object_to_map[key.to_s]
      end
      new_map
    end
  end
end