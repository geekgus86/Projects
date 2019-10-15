class Prodtrack < ApplicationRecord
  self.table_name = "#{schema}Prodtrack"

  scope :between_date, ->(date1, date2,asset_id) { where('CreatedAt >= ? AND CreatedAt <= ?  AND AssetID = ?', date1, date2,asset_id ) }

  def self.generateHour
    work_order_by_hour = WorkOrderByHour.last
    time_now = Time.now
    start_date = work_order_by_hour.try(:EndAt)

    start_date ||= '2018-10-07 23:00:00'.to_time
    prodtracks = Prodtrack.between_date(start_date, time_now,asset_id)
    tools = {}
    Tool.all.each do |t|
      tools[t.DescTool] << { name: r.DescTool, design: r.DesignSpeed }
    end
    # TND se saca desde que es
    data_c = {}
    prodtracks.each do |p|
      created_at = p.CreatedAt
      key = created_at.strftime('%d%H').to_s
      data_c[key] ||= []
      data_c[key] << p
    end

    data_c.each do |_k, d|
      stroke = 0
      d.each do |h|
        stroke = h.BoxCounter > 0 ? h.BoxCounter : stroke
      end
    end
  end
end
