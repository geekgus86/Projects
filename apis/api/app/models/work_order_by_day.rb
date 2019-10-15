class WorkOrderByDay < ApplicationRecord
  self.table_name = "#{schema}WorkOrderByDay"

  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }

  def self.get_max_day asset_id
    pieces = WorkOrderByDay.by_asset(asset_id).maximum(:Pieces)
    wd = WorkOrderByDay.by_asset(asset_id).find_by(Pieces: pieces)
    
    result = nil
    if wd
      gspm = wd.pieces / wd.tnd
      oaxpr_perc = wd.oapr > 100 ? 100 : wd.oapr.round(2)
      result = {:fecha => wd.day.strftime('%Y-%m-%d'), :gspm => gspm, :golpes => wd.pieces, :oaxpr_perc => oaxpr_perc,
        :dataq1 => {:fechaInicio => wd.start, :fechaProduccion => wd.day , :fechaCierre => wd.end, :sumPiezas => wd.pieces, :sumPiezasPotenciales => wd.piece_potentials },
        :dataq2 =>{:tnd => wd.tnd}}
    end

    return result  
  end
end
