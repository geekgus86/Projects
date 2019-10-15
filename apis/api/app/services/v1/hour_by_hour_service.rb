class V1::HourByHourService
  class << self
    attr_accessor :asset_id
    def get_hour_by_hour(day, only_schema, asset_id = 1)
      @asset_id = asset_id
      shift = ::V1::SensaiShifts.get_shifts only_schema, day  
      prod1 = WorkOrderByHour.get_data_between_date(shift["rangeShift"][:startAtUTC], shift["rangeShift"][:endAtUTC], asset_id).sort_by(&:EndAt)
      prod_last = prod1.last

      if prod_last then
        end_at = (prod_last.EndAt + 10.second).utc
        end_date = end_at + 1.hour
        if end_at > shift["rangeShift"][:endAtUTC] then
          prod2 = []
        else
          prod2 = execute_sp_hxh (prod_last.EndAt + 10.second).to_time.utc, end_date, asset_id, prod_last
        end
      else
        prod1 = []
        prod2 = []
      end
      prod = merge_prod prod1, prod2
      map_prod(prod.select { |p| p[:tool_id].present? }, true, day, only_schema)
    end

    def execute_sp_hxh start_at, end_at, asset_id, prod_last
      begin
        prod2 = Prodtrack.execute_procedure('Admin.getHxh', startDate: start_at, endDate: end_at, timezone: 0, assetID: asset_id)
      rescue Exception => e
        Rails.logger.info(e)
      #ensure
        work_order = prod_last#WorkOrder.by_asset(asset_id).last
        actual_tool = work_order.tool
        open_second = (end_at - start_at).to_i
        prod2 = [{"id" => 1, "inicio" => start_at, "fin" => end_at, "tool" => actual_tool.DescTool, "piezas" => 0, "currentSpm" => 0, "jobNumber" => actual_tool.JobNumber, "OpenSecond" => open_second, "tool_id" => actual_tool.ID, "DesignSpeed" => actual_tool.DesignSpeed, "IsTryOut" => work_order.IsTryOut, "IsOut" => work_order.IsOut}]
      end

      return prod2
    end

    def merge_prod prod1, prod2
      prod = []
      prod1.each do |p| 
        tool = p.tool
        tool ||= Tool.new
        tool.DesignSpeed ||= 0
        potential = tool.DesignSpeed * (p.Uptime / 60)
        pieces_try = 0
        pieces_try = p.Pieces if p.IsTryOut || p.IsOut
        prod << {:id=>p.ID, :inicio=>p.StartAt, :fin=>p.EndAt, :tool=>tool.DescTool, :piezas=>p.Pieces, :currentSpm=>p.RealSpeed, :jobNumber=>tool.JobNumber, :OpenSecond=>p.Uptime, :tool_id=>p.ToolID, :DesignSpeed=>tool.DesignSpeed, :potentialStrokes=>potential, :IsTryOut => p.IsTryOut, :IsOut => p.IsOut, :pieces_try => pieces_try}
      end
      prod2.each do |p|
        next if p["inicio"] == p["fin"]
        p["DesignSpeed"] ||= 0
        potential = p["DesignSpeed"] * (p["OpenSecond"] / 60)
        pieces_try = 0
        pieces_try = p["piezas"] if p["IsTryOut"] || p["IsOut"]
        prod << {:id=>p["id"], :inicio=>p["inicio"], :fin=>p["fin"], :tool=>p["tool"], :piezas=>p["piezas"], :currentSpm=>p["currentSpm"], :jobNumber=>p["jobNumber"], :OpenSecond=>p["OpenSecond"], :tool_id=>p["tool_id"], :DesignSpeed=>p["DesignSpeed"], :potentialStrokes=>potential, :IsTryOut => p["IsTryOut"], :IsOut => p["IsOut"], :pieces_try => pieces_try}
      end
      return prod
    end

    def map_prod(prod, find_tool = false, day, only_schema)
      accumulated = {
          real: 0,
          potential: 0
      }
      
      prod.map do |p|
        minutes =  p[:OpenSecond] / 1.minute
        out_time = get_out_time(p[:inicio], p[:fin], p[:inicio], only_schema)
        open_minutes = (minutes - out_time).round
        potential_pieces = p[:DesignSpeed] ? [(p[:DesignSpeed] * open_minutes).truncate(0), 0].max : 0
        accumulated_real = accumulated[:real] + p[:piezas] - p[:pieces_try]
        accumulated_potential = accumulated[:potential] + potential_pieces
        work_order_by_hour = map_work_order p, potential_pieces, accumulated_real, accumulated_potential, open_minutes, find_tool
        accumulated[:real] = accumulated_real
        accumulated[:potential] = accumulated_potential
        work_order_by_hour
      end
    end

    def map_work_order(work_order, potential_pieces, accumulated_real, accumulated_potential, open_minutes, find_tool)
      tool = Tool.find_by_ID(work_order[:tool_id]) if find_tool
      {
        ID: work_order[:id],
        StartAt: work_order[:inicio],
        EndAt: work_order[:fin],
        RealSpeed: work_order[:currentSpm],
        Pieces: work_order[:piezas],
        PotentialPieces: potential_pieces,
        AcumulatedReal: accumulated_real,
        AcumulatedPotential: accumulated_potential,
        OAHr: potential_pieces > 0 ? [((work_order[:piezas].to_f / potential_pieces.to_f) * 100).round(0), 100].min : 0,
        OAAcumulated: accumulated_potential > 0 ? [((accumulated_real.to_f / accumulated_potential.to_f) * 100).round(0), 100].min : 0,
        Uptime: open_minutes,
        tool: tool,
        IsTryOut: work_order[:IsTryOut],
        IsOut: work_order[:IsOut],
        pieces_try: work_order[:pieces_try]
      }
    end

    def get_out_time(start_date, end_date, day, only_schema)
      start_date = start_date.utc 
      end_date = end_date.utc
      
      shift = ::V1::SensaiShifts.get_shifts only_schema, day  
      actual_shift = shift['actualShift']

      @work_order_detail = WorkOrderDetail
        .where(
          AssetID: asset_id,
          # THE DOWNTIME IS IN THE SHIFT
          StartAt: actual_shift[:startAt].utc..actual_shift[:endAt].utc
        )
        .where(
          # THE DOWNTIME IS IN THE SHIFT
          '(EndAt >= ? AND EndAt <= ?) OR EndAt IS NULL', actual_shift[:startAt].utc, actual_shift[:endAt].utc 
        )
        .where(
          #CASES TO VALIDATE
          #THE START OF THE DOWNTIME IS LOWER THAN THE START OF THE HOUR AND THE DOWNTIME HAS NOT CLOSED
          #THE START OF THE DOWNTIME IS LOWER THAN THE START OF THE HOUR AND THE END OF THE DOWNTIME IS GREATER THAN THE START OF THE HOUR
          #THE START OF THE DOWNTIME IS LOWER THAN THE END OF THE HOUR AND THE END OF THE DOWNTIME IS GREATER THAN THE END OF THE HOUR
          #THE START OF THE DOWNTIME IS LOWER THAN THE END OF THE HOUR AND THE END OF THE DOWNTIME HAS NOT CLOSED
          #THE DOWNTIME IS BETWEEN THE OUR
          ' (
              (StartAt <= ? AND EndAt IS NULL) OR
              (StartAt <= ? AND EndAt >= ?) OR
              (StartAt <= ? AND EndAt >= ?) OR 
              (StartAt <= ? AND EndAt IS NULL) OR
              (StartAt >= ? AND EndAt <= ?)
            ) 
          ',
          start_date,
          start_date,
          start_date,
          end_date,
          end_date,
          end_date,
          start_date,
          end_date
        )

      work_order_details = @work_order_detail.as_json(include: {
          issue: {
              include: :issue_type
          },
          work_order_detail_groups: {
              include: {
                  parent: {
                      include: {
                          issue: {
                              include: :issue_type
                          }
                      }
                  }
              }
          }
      })

      work_order_details.delete_if do |work_order|
        #parent = work_order['work_order_detail_groups'].last['parent']
        issue = work_order['issue']
        report_group = nil #JMGr el agrupado esta fallando work_order['ReportGroup']
        #puts "---------------Aqui no truena #{work_order['ID']}--------------"
        #puts work_order
        #puts work_order['ReportGroup']
        parent = report_group ? work_order['work_order_detail_groups'].last['parent'] : {}
        #puts "--------------Pero aqui no llega #{work_order['ID']}-----------------"
        parent_issue = parent['issue']
        (!issue && !report_group) || (!report_group && issue && issue['IssueTypeID'] != 5) || (report_group && parent_issue['IssueTypeID'] != 5)
      end

      out_time = work_order_details.sum do |report|
        end_current_hour = (start_date + 1.hour).utc
        now = Time.now.utc
        report_end_at = nil

        if report['EndAt'].present?
          report_end_at = report['EndAt'].utc
        else 
          report_end_at = now > end_current_hour ? end_current_hour : now
        end

        [report_end_at, end_date].min - [report['StartAt'].utc, start_date].max
      end
      out_time / 1.minute
    end
  end
end