class V1::ToolService
  class << self
    def get_by_filter(filter_params)
      tools = Tool
            .where('DescTool like ?', "%#{filter_params[:code]}%")
            .order("#{filter_params[:sort]} #{filter_params[:order].upcase}")
      
      # if filter_params[:sort] != 'daily'
      #   tools = Tool.where('DescTool like ?', "%#{filter_params[:code]}%").order("#{filter_params[:sort]} #{filter_params[:order].upcase}")
      # else
      #   tools_ids_by_daily_work_order = DailyWorkOrder.where.not(ToolID: nil).order(StartAt: :desc).map do |daily|
      #     daily.ToolID
      #   end
      #   tools = tools_ids_by_daily_work_order.uniq.map do |tool_id|
      #     Tool.find tool_id
      #   end
      # end

      tools = tools.map do |tool| 
        _tool = tool.as_json
        last = tool.work_orders.order(:StartAt).last
        _tool[:last] = last ? last.StartAt : nil
        _tool
      end

      if filter_params[:recent] == 'desc'
        tools = tools.sort do |a, b|
          if !b[:last] then -1
          elsif !a[:last] then 1
          else b[:last] <=> a[:last] end
        end
      end

      tools

    end
  end
end