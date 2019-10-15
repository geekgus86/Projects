class V1::DatatableService

    REPORTS = {
        AFFECT: 'checkAffect',
        INDICATORS: 'checkIndicators',
        DOWNTIME_ESCALATION_PROCESS: 'checkDowntimeEscalationProcess',
        REGISTERED_INSPECTIONS: 'checkRegisteredInspections',
        INITIAL_CHECKLIST: 'checkInitialCheckList',
        EXTERNAL_CHECKLIST: 'checkExternalCheckList'
    }

    class << self
        def get_datatable params, schema = "schulerA",prensa
            start_date = Time.zone.parse(params[:start_date]).utc
            end_date = Time.zone.parse(params[:end_date]).utc
        
            report = params[:id]

            case report 
            when REPORTS[:AFFECT]
                return V1::DatatableService::checkAffect(start_date, end_date, schema,prensa)
            when REPORTS[:INDICATORS]
                return V1::DatatableService::checkIndicators(start_date, end_date, schema,prensa)
            when REPORTS[:DOWNTIME_ESCALATION_PROCESS]
                return V1::DatatableService::checkDowntimeEscalationProcess(start_date, end_date,schema,prensa)
            when REPORTS[:REGISTERED_INSPECTIONS]
                return V1::DatatableService::checkRegisteredInspections(start_date, end_date, schema,prensa)
            when REPORTS[:INITIAL_CHECKLIST]
                return V1::DatatableService::checkCheckList(start_date, end_date, 1, schema,prensa)
            when REPORTS[:EXTERNAL_CHECKLIST]
                return V1::DatatableService::checkCheckList(start_date, end_date, 2, schema,prensa)
            else 
                return { success: false }
            end          

        end

        def checkAffect start_date, end_date, schema,prensa

            @work_order_details = WorkOrderDetail
                .where(CreatedAt: start_date..end_date)
                .includes(:escalation_type, :issue)
                .references(:escalation_type, issue: :issue_type)

            @work_order_details.map do |work_order_detail|

                # Calculating round
                hour = Integer(work_order_detail[:CreatedAt].strftime("%k"))
                round = hour < 18 && hour >= 6 ? 1 : 2

                # Calculating duration
                duration = V1::DatatableService.time_diff(work_order_detail[:CreatedAt], work_order_detail[:EndAt])
                created_at = work_order_detail[:CreatedAt].in_time_zone('America/Monterrey')

                {
                    "#{I18n.t(:NBT)}": "6",
                    "#{I18n.t(:press)}": prensa,
                    "#{I18n.t(:tool)}": work_order_detail[:ToolID],
                    "#{I18n.t(:date)}": created_at.strftime("%d/%B/%Y %T"),
                    "#{I18n.t(:shift)}": round,
                    "#{I18n.t(:group)}": nil,
                    "#{I18n.t(:type)}": !defined?(work_order_detail.escalation_type[:DescEscalationType]).nil? ? work_order_detail.escalation_type[:DescEscalationType]: nil,
                    "#{I18n.t(:event)}": nil, 
                    "#{I18n.t(:duration)}": duration,
                    "#{I18n.t(:code)}": !defined?(work_order_detail.issue[:COCode]).nil? ? work_order_detail.issue[:COCode] : nil,
                    "#{I18n.t(:reason)}": !defined?(work_order_detail.issue[:DescIssue]).nil? ? work_order_detail.issue[:DescIssue] : nil,
                    "#{I18n.t(:area)}": !defined?(work_order_detail.issue[:DescIssueType]).nil? ? work_order_detail.issue.issue_type[:DescIssueType] : nil,
                    "#{I18n.t(:week)}": created_at.strftime("%U"),
                    "#{I18n.t(:month)}": created_at.strftime("%m"),
                    "#{I18n.t(:comment)}": nil
                }    
            end
            
        end

        def checkIndicators start_date, end_date, schema,prensa

            asset = Asset.get_asset(schema)

            @hxhs = Prodtrack.execute_procedure('Admin.getHxh', startDate: start_date, endDate: end_date, timezone: 0, assetID: asset.id)

            @report = []

            # Grouping by tool
            segment, prev_tool = -1

            @hxhs.each do |hxh|
                if hxh[:tool_id] != prev_tool
                    segment += 1
                end
                @report[segment] ||= []
                @report[segment] << hxh
                prev_tool = hxh[:tool_id]
            end

            # return @report

            # Getting information of groups
            @report.map do |segment|
                start_time = segment[0][:inicio]
                end_time = segment[segment.length - 1][:fin]
                tool = Tool.find_by_ID(segment[0][:tool_id])
                design_speed = segment[0][:DesignSpeed]

                # Calculating round
                hour = Integer(segment[0][:inicio].strftime("%k"))
                round = hour < 18 && hour >= 6 ? 1 : 2

                # Calculating details info
                @details = WorkOrderDetail.between_date(start_time, end_time)
                
                wo_co = (@details.by_escaletion(2).sum(&:OpenSecond) / 60).round(2)
                ca_co = @details.by_escaletion(2).length
                prom_co = (wo_co/(ca_co != 0 ? ca_co : 1)).round(2)
                wo_ot = (@details.only_out_time.sum(&:OpenSecond) / 60).round(2)
                wo_tnd = (@details.sum(&:OpenSecond) / 60).round(2) - wo_ot
                wo_dt = (@details.only_downtime.sum(&:OpenSecond) / 60).round(2)
                hits = segment.sum {|seg| seg[:piezas] }
                potential_hits = (design_speed * wo_tnd).round(2)
                gspm = (hits / (wo_tnd != 0 ? wo_tnd : 1)).round(2)
                uptime = (wo_tnd - wo_dt - wo_co).round(2)
                oapr = ((hits / ( design_speed * (wo_tnd != 0 ? wo_tnd : 1))) * 100).round(2)
                per_dt = ((wo_dt / (wo_tnd != 0 ? wo_tnd : 1)) * 100).round(2)
                per_co = ((wo_co / (wo_tnd != 0 ? wo_tnd : 1)) * 100).round(2)
                gsph =  ((hits / (wo_tnd != 0 ? wo_tnd : 1)) * 60).round(2)
                start_time = start_time.in_time_zone('America/Monterrey')
                end_time = end_time.in_time_zone('America/Monterrey')

                {
                    "#{I18n.t(:NBT)}": "6",
                    "#{I18n.t(:press)}": prensa,
                    "#{I18n.t(:group)}": "#{I18n.t(:group)} A",
                    "#{I18n.t(:tool)}": tool[:DescTool],                    
                    "#{I18n.t(:start_shift)}": round,
                    "#{I18n.t(:year)}": start_time.strftime("%Y"),
                    "#{I18n.t(:month)}": start_time.strftime("%M"),
                    "#{I18n.t(:day)}": start_time.strftime("%d"),
                    "#{I18n.t(:week)}": start_time.strftime("%U"),
                    "#{I18n.t(:date)}": start_time.strftime("%d/%B/%Y %T"),
                    "#{I18n.t(:time_minutes)}": time_diff(start_time, end_time),
                    "#{I18n.t(:out_time)}": wo_ot,                    
                    "#{I18n.t(:changeover)}": wo_co,
                    "#{I18n.t(:downtime)}": wo_dt,
                    "#{I18n.t(:changeover_quantity_abbr)}": ca_co,
                    "#{I18n.t(:NAT)}": wo_tnd,
                    "#{I18n.t(:design_speed_abbr)}": design_speed,
                    "#{I18n.t(:real_strokes)}": hits,
                    "#{I18n.t(:potential_strokes)}": potential_hits,
                    "#{I18n.t(:gspm)}": gspm,
                    "#{I18n.t(:uptime)}": uptime,
                    "#{I18n.t(:oapr)}": oapr,  
                    "% #{I18n.t(:downtime)}": per_dt,
                    "% #{I18n.t(:changeover)}": per_co,
                    "#{I18n.t(:changeover_prom_abbr)}": prom_co,
                    "#{I18n.t(:gsph)}": gsph
                }
            end
        end

        def checkDowntimeEscalationProcess start_date, end_date, schema,prensa
            
            @work_order_details = WorkOrderDetail
                .where(CreatedAt: start_date..end_date)
                .includes(:issue)
                .references(issue: :issue_type)
            
            @work_order_details.map do |work_order_detail|

                # Calculating round
                created_at = work_order_detail[:CreatedAt].in_time_zone('America/Monterrey')
                end_at = work_order_detail[:EndAt].in_time_zone('America/Monterrey')
                hour = work_order_detail[:CreatedAt] ? Integer(work_order_detail[:CreatedAt].strftime("%k")) : nil
                round = hour < 18 && hour >= 6 ? 1 : 2

                {
                    "#{I18n.t(:work_order)}": nil,
                    "#{I18n.t(:NBT)}": "6",
                    "#{I18n.t(:press)}": prensa,
                    "#{I18n.t(:shift)}": round,
                    "#{I18n.t(:date)}": created_at ? created_at.strftime("%d/%B/%Y %T") : nil,
                    "#{I18n.t(:fail_type)}": !defined?(work_order_detail.issue.issue_type[:DescIssueType]).nil? ? work_order_detail.issue.issue_type[:DescIssueType] : nil,
                    "#{I18n.t(:fail_code)}": !defined?(work_order_detail.issue[:ID]).nil? ? work_order_detail.issue[:ID] : nil,
                    "#{I18n.t(:fail_description)}": !defined?(work_order_detail.issue[:DescIssue]).nil? ? work_order_detail.issue[:DescIssue] : nil,
                    "#{I18n.t(:team_member)}": nil, #user name related
                    "#{I18n.t(:responsible_area_abbr)}": nil,
                    "#{I18n.t(:first_combat_user)}": nil,
                    "#{I18n.t(:second_combat_user)}": nil,
                    "#{I18n.t(:third_combat_user)}": nil,
                    "#{I18n.t(:fourth_combat_user)}": nil,
                    "#{I18n.t(:solution_level)}": work_order_detail[:EscalationRuleID],
                    "#{I18n.t(:downmtime_start)}": created_at ? created_at.strftime("%d/%B/%Y %T") : nil,
                    "#{I18n.t(:first_combat_start)}": nil,
                    "#{I18n.t(:error_identification_record)}": nil,
                    "#{I18n.t(:identification_time)}": nil,
                    "#{I18n.t(:first_combat_checkin)}": nil,
                    "#{I18n.t(:first_combat_timecheck)}": nil,
                    "#{I18n.t(:second_combat_start)}": nil,
                    "#{I18n.t(:second_combat_checkin)}": nil,
                    "#{I18n.t(:second_combat_timecheck)}": nil,
                    "#{I18n.t(:third_combat_start)}": nil,
                    "#{I18n.t(:third_combat_checkin)}": nil,
                    "#{I18n.t(:third_combat_timecheck)}": nil,
                    "#{I18n.t(:fourth_combat_start)}": nil,
                    "#{I18n.t(:fourth_combat_checki)}": nil,
                    "#{I18n.t(:fourth_combat_timecheck)}": nil,
                    "#{I18n.t(:solution_time)}": nil,
                    "#{I18n.t(:total_solution_time)}": nil,
                    "#{I18n.t(:downmtime_end)}": end_at ? end_at.strftime("%d/%B/%Y %T") : nil
                }
            end
        end

        def checkRegisteredInspections start_date, end_date, schema,prensa
            
            @inspections = Inspection
                            .where(CreatedAt: start_date..end_date)
                            .includes(:tool, :user, :inspection_approvals)
                            .references(:tool, :user, inspection_approvals: { inspection_check_list: :instrument })

            new_inspections = []

            @inspections.each do |inspection|
                
                new_inspections += inspection.inspection_approvals.map do |inspection_approval|

                    created_at = inspection[:CreatedAt].in_time_zone('America/Monterrey')

                    {
                        "#{I18n.t(:inspection_number_abbr)}": inspection[:ID],
                        "#{I18n.t(:inspection_result)}": inspection[:Success] ? "#{I18n.t(:approved)}" : "#{I18n.t(:dont_approved)}",
                        "#{I18n.t(:process)}": 0,
                        "#{I18n.t(:press)}": prensa,
                        "#{I18n.t(:operation)}": 0,
                        "#{I18n.t(:product_under_review)}": inspection.tool[:DescTool],
                        "#{I18n.t(:review_date)}": created_at.strftime("%d/%B/%Y %T"),
                        "#{I18n.t(:quality_inspector)}": inspection.user[:name],
                        "#{I18n.t(:review_type)}": inspection_approval.inspection_check_list[:Spec],
                        "#{I18n.t(:reference)}": inspection_approval.inspection_check_list[:Reference],
                        "#{I18n.t(:specification)}": inspection_approval.inspection_check_list[:Feature],
                        "#{I18n.t(:instrument)}": !defined?(inspection_approval.inspection_check_list.instrument[:DescInstrument]).nil? ? inspection_approval.inspection_check_list.instrument[:DescInstrument] : nil,
                        "#{I18n.t(:numeric_value)}": inspection_approval[:InspectionValue],
                        "#{I18n.t(:result_of_review)}": inspection_approval[:InspectionApprove] ? "#{I18n.t(:approved)}": "#{I18n.t(:dont_approved)}",
                        "#{I18n.t(:comments)}": inspection[:Remark]
                    }
                end

            end

            new_inspections

        end

        def checkCheckList start_date, end_date, checkListTypeID, schema,prensa
            @check_list_answers = CheckListAnswer
                                    .where(CreatedAt: start_date..end_date)
                                    .includes(:check_list)
                                    .references(:check_list)
                                    .where('CheckList.CheckListTypeID = ?', checkListTypeID)

            @check_list_answers.map do |check_list_answer|


                create_at = check_list_answer[:CreatedAt].in_time_zone('America/Monterrey')
                hour = Integer(check_list_answer[:CreatedAt].strftime("%k"))
                round = hour < 18 && hour >= 6 ? 1 : 2 
                {
                    "#{I18n.t(:work_order)}": check_list_answer.WorkOrderID,
                    "#{I18n.t(:NBT)}": 6,
                    "#{I18n.t(:press)}": prensa,
                    "#{I18n.t(:date)}": create_at.strftime("%d/%B/%Y %T"),
                    "#{I18n.t(:shift)}": round,
                    "#{I18n.t(:group)}": !defined?(check_list_answer.check_list.user.team.group.Alias).nil? ? check_list_answer.check_list.user.team.group.Alias : nil,
                    "#{I18n.t(:team_member)}": !defined?(check_list_answer.check_list.user.name).nil? ? check_list_answer.check_list.user.name : nil,
                    "#{I18n.t(:team_leader)}": !defined?(check_list_answer.check_list.user.team.user.name).nil? ? check_list_answer.check_list.user.team.user.name : nil,
                    "#{I18n.t(:group_leader)}": !defined?(check_list_answer.check_list.user.team.group.user.name).nil? ? check_list_answer.check_list.user.team.group.user.name : nil,
                    "#{I18n.t(:start_hour)}": nil,
                    "#{I18n.t(:end_hour)}": nil,
                    "#{I18n.t(:time)}": nil,
                    "#{I18n.t(:category)}": !defined?(check_list_answer.check_list_section.DescSection).nil? ? check_list_answer.check_list_section.DescSection : nil,
                    "#{I18n.t(:revision)}": !defined?(check_list_answer.check_question.DescQuestion).nil? ? check_list_answer.check_question.DescQuestion : nil,
                    "#{I18n.t(:confirmation)}": check_list_answer.Answer ? 'OK': 'NOT OK',
                    "#{I18n.t(:comments)}": check_list_answer.Comment,
                    "#{I18n.t(:checklist_status)}": nil
                }
            end
        end

        def time_diff(start_time, end_time)
            end_time = !end_time.nil? ? end_time : Time.zone.now 

            seconds_diff = (start_time - end_time).to_i.abs
            
            hours = seconds_diff / 3600
            seconds_diff -= hours * 3600
            
            minutes = seconds_diff / 60
            seconds_diff -= minutes * 60
            
            seconds = seconds_diff
            
            "#{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(2, '0')}:#{seconds.to_s.rjust(2, '0')}"
        end
        
    end
end