class V1::JulianNumberService
  class << self
    def get_last_10(tool_id)
      end_date = DateTime.now
      start_date = end_date - 10.days
      
      @work_orders = WorkOrder.where StartAt: start_date..end_date, ToolID: tool_id
      @work_orders.map do |work_order|
        previous_work_order = WorkOrder.where(ID: work_order.ID - 1).take
        previous_julian = previous_work_order ? work_order.StartAt - 1.seconds == previous_work_order.EndAt : false
        julian = previous_julian ? previous_work_order.StartAt.strftime('%y-%j') : work_order.StartAt.strftime('%y-%j')
        {
          inspection: work_order.ID,
          julian: julian,
          date: work_order.StartAt
        } 
      end
    end
  end
end