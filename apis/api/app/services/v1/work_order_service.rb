class V1::WorkOrderService
    class << self

      def get_lasts_by_tool(params)
        end_date = DateTime.now
        start_date = end_date - 10.days
        @work_orders = WorkOrder.where StartAt: start_date..end_date, ToolID: params[:tool_id]
        @work_orders.map do |work_order|
          wo = work_order.as_json
          previous_wo = WorkOrder.where(ID: work_order.ID - 1).take
          previous_julian = previous_wo ? work_order.StartAt - 1.seconds == previous_wo.EndAt : false
          julian = previous_julian ? previous_wo.StartAt.strftime('%y-%j') : work_order.StartAt.strftime('%y-%j')
          wo[:julian] = julian
          wo[:inspections] = work_order.inspections.map do |inspection|
            ins = inspection.as_json
            ins[:Inspector] = inspection.user
            ins
          end

          wo
        end
      end

    end
end
