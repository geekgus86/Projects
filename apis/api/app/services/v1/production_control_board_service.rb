class V1::ProductionControlBoardService
  class << self

    def get_week_production only_schema, asset_id
      first_date = Time.now.utc.beginning_of_week.change({hour: 12, min: 0, sec: 0})

      shifts = []
      date_to_iterate = first_date
      7.times do |i|
        temp_shifts = ::V1::SensaiShifts.get_shifts(only_schema, date_to_iterate)
        temp_shifts_arr = temp_shifts['shifts'].map { |key, value| value }
        shifts +=  temp_shifts_arr
        date_to_iterate = date_to_iterate + 1.day
      end

      work_orders_of_week = WorkOrder.where('StartAt >= ? AND EndAt <= ? AND AssetID = ? AND IsOut = 0 AND IsTryOut = 0', shifts.first[:startAt], shifts.last[:endAt], asset_id).order('StartAt ASC')
      
      day_work_order_by_shift = shifts.map do |shift|
        if !shift[:work_orders]
          shift[:work_orders] = []
        end
        work_orders_of_week.each do | work_order |
          if (work_order[:StartAt].utc).between?(shift[:startAt].utc, shift[:endAt].utc)
            shift[:work_orders] << work_order
          end
        end
        shift
      end
      
      day_work_order_by_shift.map do |shift|
        sumPiezas = shift[:work_orders].sum do | work_order | 
          work_order[:UnitsAuto]
        end
        { fecha: shift[:startAt], diaFinal: shift[:startAt], turno: shift[:Description], sumPiezas: sumPiezas}
      end
    end

    def get_reports_of_day(day, only_schema, asset_id)
      shift_data = ::V1::SensaiShifts.get_shifts(only_schema, day)
      day = shift_data['rangeShift']
      timezone = shift_data['timezone']
      hour_end_minute = day[:startAt].strftime('%M').to_i
      @work_order_details = WorkOrderDetail
                                .where(
                                    StartAt: day[:startAt]..day[:endAt],
                                    AssetID: asset_id
                                )
                                .order(StartAt: :asc, ReportDivision: :asc)

      #puts 'maldito2'
      #puts @work_order_details.as_json

      details = @work_order_details.map do |work_order_detail|
        {
            has_parent: false
        }.merge! work_order_detail.as_json(include: {
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
            },
            group:{
              include: {
                          issue: {
                                include: :issue_type
                            }
                        }
            }
        })
      end

      # details.delete_if do |report|
      #   groups = report['work_order_detail_groups']
      #   report['ReportGroup'] == 1 && (!report['work_order_detail_group'] || !(groups.uniq.length == 1 && groups[0] == report['work_order_detail_group']))
      # end
      result = details.map do |work_order_detail|

        work_order_minute = work_order_detail['StartAt'].strftime('%M').to_i
        if work_order_minute == 0
          work_order_minute = 59
        end
        hour_to_add = hour_end_minute > work_order_minute ? 0 : 1  
        end_hour = (work_order_detail['StartAt'] + hour_to_add.hour).change({min: hour_end_minute, sec: 0})
        start_hour = work_order_detail['StartAt']
        wod_not_end_at = false
        end_hour_excedeed = false

        now_hour = Time.now.in_time_zone(timezone)

        #
        if end_hour > now_hour
          end_hour = now_hour
          end_hour_excedeed = true
        end

        unless work_order_detail['EndAt']
          work_order_detail['EndAt'] = end_hour # work_order_detail['StartAt']
          wod_not_end_at = true
        end
      
        #
        if work_order_detail['EndAt'] >= end_hour && !end_hour_excedeed
          new_work_order = work_order_detail.clone
          new_work_order['StartAt'] = end_hour
          new_work_order[:has_parent] = true
          if wod_not_end_at && !end_hour_excedeed
            new_work_order['EndAt'] = nil
          end
          details.push new_work_order
        else
          end_hour = work_order_detail['EndAt']
        end
        issue_id = work_order_detail['issue'] ? work_order_detail['issue']['IssueTypeID'] : nil
        issue_name = work_order_detail['issue'] ? work_order_detail['issue']['issue_type']['DescIssueType'] : nil
        issue_desc = work_order_detail['issue'] ? work_order_detail['issue']['DescIssue'] : nil
        issue_code = work_order_detail['issue'] ? (work_order_detail['EscalationTypeID'] == 2 ? work_order_detail['issue']['COCode'] : work_order_detail['issue']['DTCode']) : nil
        issue_color = work_order_detail['issue'] ? work_order_detail['issue']['issue_type']['Color'] : '#000000'
        report_number = work_order_detail['ReportNumber']
        report_division = work_order_detail['ReportDivision'] || ''
        #JMGR temporalmente quitado :O
        #work_order_detail['ReportGroup'] = nil
        #

         if work_order_detail['WorkOrderDetailGroupID'].present?  && work_order_detail['group'].present?
           parent = work_order_detail['group']['parent']
           group = work_order_detail['group']
           issue_id = group['issue']['IssueTypeID']
           issue_name = group['issue']['issue_type']['DescIssueType']
           issue_desc = group['issue']['DescIssue']
           issue_code = group['EscalationTypeID'] == 2 ? group['issue']['COCode'] : group['issue']['DTCode']
           issue_color = group['issue']['issue_type']['Color']
           report_number = group['ReportNumber']
           report_division = work_order_detail['ReportDivision'] || ''
         end
        #
        diff = ((end_hour - start_hour)/1.minute).round(2)
          {
            reportId: work_order_detail['ID'],
            id: issue_id,
            color: issue_color,
            createdAt: start_hour,
            closedAt: end_hour,
            limitMin: start_hour.change({min: hour_end_minute, sec: 0}),
            limitMax: (start_hour + 1.hour).change({min: hour_end_minute, sec: 0}),
            report_type: work_order_detail['EscalationTypeID'],
            report_status: work_order_detail['ReportStatusID'],
            name: issue_name,
            desc: issue_desc,
            code: issue_code,
            diff: diff,
            report_number: report_number,
            report_division: report_division,
            has_parent: work_order_detail[:has_parent],
            group: group,
            #Esto indica al front que este WOD está agrupado.
            is_grouped: work_order_detail['WorkOrderDetailGroupID'] ? true : false
          }
      end

      # Ordenamos el resultado por fecha de creación
      sorted_result = result.sort_by do |report|
        report[:createdAt]
      end
      sorted_result
    end

    def get_last_record_production(asset_id = 1)
        maxDay = WorkOrderByDay.get_max_day asset_id
        return maxDay
    end

    def change_date start_at, shift_start_at
      start_turn = shift_start_at 
      24.times do |a|
        start_turn = shift_start_at 
        start_turn += a.hour
        if start_turn <= start_at && ((start_turn + 1.hour) - 1.second) >= start_at
          rett = start_turn.change(min: start_turn.strftime('%M'), sec: 0)
          return rett
        end 

      end
    end

    def get_shift_information(day, only_schema = 'apo_schulerA', asset_id = 1)
      work_order_by_hour = V1::HourByHourService.get_hour_by_hour day, only_schema, asset_id
      shift = ::V1::SensaiShifts.get_shifts only_schema, day   

      #grouped_work_order_by_hour = work_order_by_hour.group_by do |work_order|
      #  work_order[:StartAt].change(min: shift["actualShift"][:startAt].strftime('%M'), sec: 0)
      #  #change_date(work_order[:StartAt], shift["shifts"][1][:startAt])
      #end
      grouped_work_order_by_hour = {}
      work_order_by_hour.each do |work_order|
        start_at = change_date(work_order[:StartAt], shift["shifts"][1][:startAt])
        grouped_work_order_by_hour[start_at] ||= []
        grouped_work_order_by_hour[start_at] << work_order
      end


      hour_by_hour = []
      grouped_work_order_by_hour.keys.each do |key|
        work_order_array = grouped_work_order_by_hour[key]
        start_hour = work_order_array[0][:StartAt].in_time_zone(Time.zone).change(min: shift["actualShift"][:startAt].strftime('%M'), sec: 0)
        pieces = work_order_array.sum{ |work_order| work_order[:Pieces] }
        potential_pieces = work_order_array.sum{ |work_order| work_order[:PotentialPieces] }
        pieces_try = work_order_array.sum{ |work_order| work_order[:pieces_try] }
        in_try_out = work_order_array.map{ |work_order| work_order[:IsTryOut] }.all?
        in_out = work_order_array.map{ |work_order| work_order[:IsOut] }.all?
        in_out_f = work_order_array.last[:IsOut] || work_order_array.last[:IsTryOut]
        hour_by_hour.push(
          {
              hora: start_hour,
              horaEnd: start_hour + 1.hour,
              dateperiod: "#{start_hour.strftime('%I:%M %p')} - #{(start_hour + 1.hour).strftime('%I:%M %p')}",
              spm: find_tools_spm(work_order_array),
              piezas: pieces,
              piezas_s: join_piezas(work_order_array),
              piezas_p: potential_pieces,
              acumulado_r: work_order_array.last[:AcumulatedReal],
              acumulado_p: work_order_array.last[:AcumulatedPotential],
              oa_h: (potential_pieces > 0 ? [(((pieces.to_f - pieces_try.to_f) / potential_pieces.to_f) * 100).round(0), 100].min : 0),
              oa_a: [work_order_array.last[:OAAcumulated].round(0), 100].min,
              uptime: work_order_array.sum{ |work_order| work_order[:Uptime].round(2) },
              tool: find_all_tools(work_order_array),
              org: nil,
              createdBy: nil,
              work_order: '00000',
              is_try_out: in_try_out,
              in_out_f: in_out_f,
              in_out: in_out,
              pieces_try: pieces_try
          }
        )
      end
      hour_by_hour
    end

    def find_tools_spm(work_order_array)
      tool = ''
      work_order_array.each_with_index do |work_order, index|
        if index > 0
          tool += '-'
        end
        tool += work_order[:tool][:DesignSpeed].to_s
      end
      tool
    end

    def join_piezas work_order_array
      piezas = []
      work_order_array.each_with_index do |work_order, index|
        piezas_tmp = work_order[:IsTryOut] || work_order[:IsOut] ? "#{work_order[:Pieces]}*" : work_order[:Pieces]
        piezas << piezas_tmp
      end
      piezas.join('/')
    end

    def find_all_tools(work_order_array)
      tool = []
      work_order_array.each_with_index do |work_order, index|
        tool_description = work_order[:IsTryOut] ? "#{work_order[:tool][:DescTool]}T" : work_order[:tool][:DescTool]
        tool_description = work_order[:IsOut] ? "#{work_order[:tool][:DescTool]}*" : tool_description
        tool << tool_description
      end
      tool.join(' - ')
    end

    def week_start
      Time.now.beginning_of_week.utc.change({hour: 12, min: 0, sec: 0})
    end

    def get_tnd(date)
      shifts = Services::SensaiDates.get_turns date
      @work_order_detail = WorkOrderDetail
                                .where(
                                    StartAt: shifts[:range][:startAt]..shifts[:range][:endAt]
                                )
                                .joins(:issue)
                                .references(:issue)
                                .where('Issue.IssueTypeID = ?', 5)
      out_time = @work_order_detail.sum do |report|
        report.StartAt - report.EndAt
      end
      1440 - out_time
    end

    def get_week_hour_by_hour(first_date)
      week_end = (first_date + 7.days).utc.change(hour: 11, min: 59, sec: 59)
      prod = WorkOrderByHour.where('StartAt >= ? AND EndAt <= ?', first_date, week_end).includes(:tool).order('StartAt ASC')
      map_week_prod prod
    end

    def map_week_prod(prod)
      shift_accumulated = {}
      prod.map do |p|
        shifts = Services::SensaiDates.get_turns p[:StartAt].utc
        actual_shift = shifts['turnActual']
        shift_key = shifts[actual_shift.to_sym][:startAt]
        unless shift_accumulated[shift_key.to_s.to_sym]
          new_accumulated_shift = {}
          new_accumulated_shift[shift_key.to_s.to_sym] = { real: 0, potential: 0 }
          shift_accumulated.merge! new_accumulated_shift
        end
        open_minutes = (p[:Uptime] / 60) - V1::HourByHourService.get_out_time(p[:StartAt], p[:EndAt])
        potential_pieces = p[:DesignSpeed] ? (p[:DesignSpeed] * open_minutes).truncate(0) : 0
        accumulated_real = shift_accumulated[shift_key.to_s.to_sym][:real] + p[:Pieces]
        accumulated_potential = shift_accumulated[shift_key.to_s.to_sym][:potential] + potential_pieces
        work_order_by_hour = {
            ID: p[:ID],
            StartAt: p[:StartAt],
            EndAt: p[:EndAt],
            RealSpeed: p[:RealSpeed],
            Pieces: p[:Pieces],
            PotentialPieces: potential_pieces,
            AcumulatedReal: accumulated_real,
            AcumulatedPotential: accumulated_potential,
            OAHr: potential_pieces > 0 ? [((p[:Pieces].to_f / potential_pieces.to_f) * 100).round(0), 100].min : 0,
            OAAcumulated: accumulated_potential > 0 ? [((accumulated_real.to_f / accumulated_potential.to_f) * 100).round(0), 100].min : 0,
            Uptime: open_minutes,
            tool: p.tool
        }
        shift_accumulated[shift_key.to_s.to_sym][:real] = accumulated_real
        shift_accumulated[shift_key.to_s.to_sym][:potential] = accumulated_potential
        work_order_by_hour
      end
    end

  end
end
