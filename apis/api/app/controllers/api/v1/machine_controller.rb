class Api::V1::MachineController < ApplicationController
=begin
    render json: {:header => header, :body => {:tnd => tnd, :gspm => gspm,  :promedio_co => promedio_co, :num_corridas => num_corridas, :num_eventos => num_eventos, :oaxpr => oaxpr, 
          :golpes_reales => golpes_reales, :detail => workorder}}.to_json
=end
    before_action :authenticate 
    def checkout
        render json: {
            success: true,
            data: nil
        }
    end

    def checkin
        schema = params[:schema]
        label = 'Schuler A'
	if schema == 'apo_schulerA'
            #Se agrega bandera de maximo
            maximo = Asset.get_asset(schema).maximo
        end
        if schema == 'apo_schulerB'
            label = 'Schuler B'
        end
        if schema == 'et_k15'
            label = 'K15'
        end
        if schema == 'et_k14'
            label = 'K14'
        end
	if schema == 'apo_fagorA'
            label = 'Fagor A'
        end
        if schema == 'apo_fagorB'
            label = 'Fagor B'
        end
	if schema == 'et_k3'
            label = 'K3'
        end
        if schema == 'et_k4'
            label = 'K4'
        end
	if schema == 'et_k1'
            label = 'K1'
        end
        if schema == 'et_k2'
            label = 'K2'
        end
        if schema == 'et_k9'
            label = 'K9'
        end
	if schema == 'apo_jinan'
            label = 'Jinan'
        end
	if schema == 'apo_k1200'
            label = 'K1200'
        end
        if schema == 'et_k5'
            label = 'K5'
        end
        if schema == 'et_k6'
            label = 'K6'
        end
        if schema == 'et_k7'
            label = 'K7'
        end
        if schema == 'et_k8'
            label = 'K8'
        end


        render json: {
            :success => true,
            :data => {
                :id => 1,
                :name => schema,
                :serialno => "1",
                :label => label,
                :maximo => maximo
            },
    }
    end

    def getCurrentFailure        
        #FIXME grouped - Pending for Validation
        data = WorkOrderDetail.where(:EndAt => nil, :ReportDivision => nil,:WorkOrderDetailGroupID => nil, :AssetID => asset_id).last()
        if data
            data_tmp = data
            data = WorkOrderDetail.find_by_ID(data.ParentID) if  data.ParentID.present?
            result = {}
            result = data.attributes
            is_out = data.IsTryOut || data.IsOut
            if data.OpenSecond.present? && !is_out
                render json: {
                    :success => false,
                    :data => {
                        :report => nil,
                        :escalation => nil
                    }   
                }
            else
                escalationRule = Prodtrack.execute_procedure('Admin.getEscalationRule', wodId = data.ID, startAt = data.StartAt, escalationTypeId = data.EscalationTypeID, escalationRuleId = data.EscalationRuleID)[0]
                it = data.issue.try(:issue_type)
                is_try_out = data.IsTryOut || data.IsOut
                is_out = data.IsOut
                is_try_out1 = data.IsTryOut 
                code = ''
                desc = ''
                issueType = '--'
                if data.issue
                    if data.EscalationTypeID == 1
                        code = data.issue.DTCode
                    else
                        code = data.issue.COCode
                    end
                    issueType = it.try(:DescIssueType)
                    desc = code
                end
                wo_maximo = WorkOrderMaximo.find_by(:wod_id => data.ID)
                result = { 
                    id: data[:ID], 
                    createdAt: data[:StartAt], 
                    EndAt: data[:EndAt], 
                    issue: data.issue.try(:ID), 
                    escalationLevel: data.escalation_rule.LevelEscalation, 
                    report_type: data[:EscalationTypeID], 
                    desc: desc, 
                    code: code, 
                    color: it.try(:Color), 
                    name: it.try(:DescIssueType), 
                    issueType: issueType, 
                    extraDowntime: 0, 
                    issue_type: it.try(:ID), 
                    try_out: is_try_out, 
                    is_out: is_out, 
                    is_try_out1: is_try_out1, 
                    tool_desc:  data_tmp.tool.DescTool,
                    show_wo: (wo_maximo.present? && [3,4].include?(it.try(:id)) ),
                    wo_maximo: wo_maximo.try(:wo_num),
                    wo_maximoMsg: wo_maximo.try(:message),
                    wo_maximo_id: wo_maximo.try(:workorder_id)
                }

                escalation = { 
                    id: data.escalation_rule.ID, 
                    level: data.escalation_rule.LevelEscalation, 
                    limit: data.escalation_rule.LimitEscalation, 
                    label: data.escalation_rule.DescEscalationRule, 
                    type: data.escalation_rule.EscalationTypeID, 
                    color: data.escalation_rule.Color 
                }

                render json: {
                    :success => true,
                    :data => {
                        :report => result,  
                        :escalation => escalation
                    }
                }
            end
        else
            render json: {
                :success => false,
                :data => {
                    :report => nil,
                    :escalation => nil
                }
            }
        end
    end

    def getUserMachine
        render json: {
            success: true,
            data: []
        }
    end

    def getMachineChecklist
        checklistType = params[:checklist_type]
        #checklist = CheckList.find(checklistType)
        checklist_type = CheckListType.find_by_ID checklistType
        result = {}
        #result = checklist.attributes
        result = checklist_type.attributes
        result[:sections] = []

        checklist_type.check_list_sections.each do |section|
            sectionResult = {}
            sectionResult = section.attributes
            sectionResult[:questions] = []

            section.check_questions.each do |question|
                sectionResult[:questions].push(question.attributes)
            end

            result[:sections].push(sectionResult)
        end

        render json: { "success": true, :data => result }
    end

end
