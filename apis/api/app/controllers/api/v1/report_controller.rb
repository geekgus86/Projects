require 'time'
class Api::V1::ReportController < ApplicationController

    # before_action :authenticate
    include ::V1::EventBus::Channels


    def getLog
        day = params[:day]
        shift = params[:shift]

        dateRange = ::V1::SensaiShifts.get_shifts only_schema, day
        turnoActual = dateRange["actualShift"]

        if shift == 'last'
            turnoActual = dateRange["previousShift"]
        end    

        #Add workorders in getLog
        workOrders = WorkOrder.get_data(turnoActual[:startAt], turnoActual[:endAt], asset_id)
        data = WorkOrderLog.get_data(turnoActual[:startAt], turnoActual[:endAt], asset_id).sort_by { |k| k[:EndAt] }.reverse
        fromDate = turnoActual[:startAt].in_time_zone(dateRange["timezone"]).to_time
        toDate = turnoActual[:endAt].in_time_zone(dateRange["timezone"]).to_time+1
        render json: { 
            success: true, 
            workOrders: workOrders,
            range: "#{I18n.l(fromDate, format: '%-d %b %l:%M %p')} - #{I18n.l(toDate, format: '%-d %b %l:%M %p')}",
            fromDate: I18n.l(fromDate, format: '%Y-%m-%d %H'),
            toDate: I18n.l(toDate, format: '%Y-%m-%d %H'),
            data: data 
        }
    end

    def getLogDetail
        id = params[:id]
        work_order_details = WorkOrderDetail.includes(:issue, :escalation_rule, :tool, :report_status, :group).where({WorkOrderDetailGroupID: id})
        puts work_order_details.as_json

        wods = work_order_details.map do |w|
            type = w.report_status
            wo_maximo = WorkOrderMaximo.find_by(:wod_id => w.ID)
            w.IssueID = w.IssueID_was if wo_maximo.present?
            i = w.try(:issue)
            e = w.try(:escalation_rule)
            t = w.try(:tool)
            it = i.try(:issue_type)
            open_minutes = (w.OpenSecond / 60).round(2)
            code = ''
            desc = ''
            issue_type = '--'
            if w.try(:issue)
                if w.EscalationTypeID == 1
                code = i.DTCode
                else
                code = i.COCode
                end
                issue_type = it.DescIssueType
                desc =  "#{code} - #{i.DescIssue}"
            end

            { 
                id: w.ID, 
                report: w.ID, 
                type: type.DescStatus, 
                createdAt: w.StartAt, 
                issue: i.try(:ID), 
                escalationLevel: e.try(:LevelEscalation), 
                closedAt: w.try(:EndAt),
                open_minutes: open_minutes, 
                report_statusID: w.ReportStatusID,
                report_group: w.try(:ReportGroup), 
                report_division: w.try(:ReportDivision), 
                reportCreatedAt: w.try(:StartAt), 
                report_type: w.try(:EscalationTypeID), 
                report_number: w.ReportNumber, 
                tool_code: t.try(:DescTool), 
                desc: desc, 
                code: code, 
                color: it.try(:Color), 
                name: it.try(:DescIssueType), 
                area: it.try(:ID),
                issueType: issue_type,
                show_wo: wo_maximo.present?,#(wo_maximo.try(:wo_num).present? && wo_maximo.try(:workorder_id).present?),
                wo_maximo: wo_maximo.try(:wo_num),
                wo_maximoMsg: wo_maximo.try(:message),
                wo_maximo_id: wo_maximo.try(:workorder_id)
            }
        end

        render json: { success: true, data: wods }
    end

    def assignFailure
        userId = Auth::Current.user['id']
        reportId = params[:report_id]
        issueId = params[:issue_id]
        reportType = params[:report_type]   
        
        f = WorkOrderDetail.find_by_ID(reportId)

        group = f.group
        if group.present?
            dataGroup = { :IssueID => issueId, :EscalationTypeID => reportType}
            group.update_columns(dataGroup)
        end

        data = { :IssueID => issueId, :EscalationTypeID => reportType} 
        if reportType !=  f.EscalationTypeID
            # TODO: Esto hay que revisarlo
            ::V1::EventBus::EventBusService.publish 'metalsa/reportTypeChanged', f              
            
            actualOpenMinutes = 0
            if f.try(:EndAt)
                actualOpenMinutes = (f.try(:OpenSecond) / 60)
            else
                actualOpenMinutes = (((Time.now - f.StartAt) / 1.second).round / 60)
            end

            newEscalationRuleID = 0
            escalationRules = EscalationRule.where(:EscalationTypeID => reportType)

            escalationRules.each do |rule|
                if actualOpenMinutes <= rule.LimitEscalation
                    newEscalationRuleID = rule.ID
                    break
                end
            end

            if newEscalationRuleID == 0
                newEscalationRuleID = escalationRules.last.ID
            end

            #Emmit socket to ANDOn if report isn't closed
            #unless f[:EndAt]

            #    data = {}
            #    data[:schema] = schema
                #A C/O turn in Downtime
            #    if reportType == 1
            #        data[:status] = false
            #    else
            #        data[:status] = true
            #    end
            #end

            data = { :IssueID => issueId, :EscalationTypeID => reportType, :EscalationRuleID => newEscalationRuleID }
        end     

        f.update_columns(data)
        data1 = f.attributes
        data1[:AssetID] = asset_id
        data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
        rule = f.escalation_rule

        # TODO: Esto hay que revisarlo
        ::V1::EventBus::EventBusService.publish 'metalsa/failureIdentified', data1
        #Create log
        msg = "{\"id\": 0, \"message\": \"Identificado en #{rule.DescEscalationRule}\", \"level\": \"#{rule.ID}\"}"
        l = WorkOrderLog.create(
            :WorkOrderDetailID => f.ID,
            :EscalationRuleID => rule.ID,
            :ReportStatusID => 12,
            :Message => msg,
            :CreatedBy => userId, 
            :UserID => userId, 
            :CreatedAt => Time.now
        )
        #404 actualizar ReportStatusID de workOrderDetail
        render json: { "success": true, :data => f }
    end

    def getOm

        day = Time.now.utc
        if params[:day].is_a? String
            day = Time.zone.parse(params[:day]).utc
        end        
        
        shift = params[:shift]
        dateRange = Services::SensaiDates.get_turns(day)
        turnoActual = dateRange['turnActual']
        turnoActual = dateRange[turnoActual.to_sym]
        if shift == 'last'
            day = ((turnoActual[:startAt]).to_time - 12.hours)
            dateRange = Services::SensaiDates.get_turns(day)
            turnoActual = dateRange['turnActual']
            turnoActual = dateRange[turnoActual.to_sym]
        end
        service = Services::DailyProductionReport.new(turnoActual[:startAt], turnoActual[:endAt],asset_id)
        header = service.get_om
        render json: { "success": true, :data => header }
    end

    def manualEscalation
        userId = Auth::Current.user['id']
        report_id = params[:reportId]

        w = WorkOrderDetail.find_by_ID(report_id)
        w.update_columns(:EscalationManual => true)

        curr_escalation = w.escalation_rule
        curr_escalation_type = w.escalation_type

        open_seconds = 0
        if w.OpenSecond
            open_seconds = w.OpenSecond
        end 

        rule = EscalationRule.where(:LevelEscalation => curr_escalation[:LevelEscalation] + 1, :EscalationTypeID => curr_escalation_type[:ID])[0]
        if !w.OpenSecond && rule
            #Escalalar paro
            ::V1::EventBus::EventBusService.publish 'metalsa/escalationStart', { level: rule[:ID], label: rule[:DescEscalationRule], ID: w[:ID], user: userId, :AssetID => asset_id, dbSchema: {DB: get_database, schema: schema, :asset => only_schema} }
            #404 actualizar ReportStatusID de workOrderDetail
        end
=begin
        if w.EndAt && open_seconds>=0 && curr_escalation_type[:ID] == 1
            w.update_columns(:EscalationRuleID => 1, :OpenSecond => nil, :EndAt => nil, :IssueID => nil, :StartAt => Time.now, :CreatedAt => Time.now)
            log = WorkOrderLog.find_by(:WorkOrderDetailID => w.ID)
            log.destroy
            result = {}
            result = w.attributes 
            result[:statusStops] = 0
            ::V1::EventBus::EventBusService.publish 'metalsa/startsprod', result
        end
        if !rule && !w.EndAt && curr_escalation_type[:ID] == 1
            result = {}
            result = w.attributes 
            result[:statusStops] = 1
            ::V1::EventBus::EventBusService.publish 'metalsa/stopsprod', result
        end
=end
        render json: { "success": true, :data => w }
    end
    
    def manualAssist
        report_id = params[:reportId]
        tadi = params[:tadi]
        userId = '-'
        if (tadi)
            userId = tadi.delete('^0-9')
        end

        w = WorkOrderDetail.find_by_ID(report_id)
        escalation = w.escalation_rule
        issue = w.issue
        # validate admin
        body = { tadi: tadi, issueTypeId: issue.IssueTypeID, escalationRuleId: w.EscalationRuleID, asset:only_schema }
        Rails.logger.info "#{tadi} #{issue.IssueTypeID} #{w.EscalationRuleID} #{only_schema}"
        headers = { }       
        #response = V1::Http::HttpService.request 'post', 'https://api-admin.azurewebsites.net', '/api/team/validate/', headers, body
        response = V1::Http::HttpService.request 'post', 'http://i40appgateway.eastus.cloudapp.azure.com', '/admin/api/team/validate/', headers, body
        valid = JSON.parse(response.body)['valid']
        message = JSON.parse(response.body)['message']

        if valid
            msg = "{\"id\": 0, \"message\": \"Asignado a #{tadi}\", \"tadi\": \"#{tadi}\", \"escalationLevel\": \"#{escalation.DescEscalationRule}\"}"
            
            ::V1::EventBus::EventBusService.publish 'metalsa/assistanceConfirmedprod', {:value=> true, :AssetID => asset_id, :dbSchema => {:DB => get_database, :schema => schema, :asset => only_schema}}
            l = WorkOrderLog.create(
                :WorkOrderDetailID => w.ID,
                :EscalationRuleID => escalation.ID,
                :ReportStatusID => 9,
                :Message => msg,
                :CreatedBy => userId, 
                :UserID => userId
                )
                #404 actualizar ReportStatusID de workOrderDetail
            render json: { "success": true, :data => { nombre: message } }
        else
            data = ''
            if (!message) 
                data = I18n.t(:TADI_not_found)
            else
                data = I18n.t(message)
            end
            render json: { "success": false, "data": data }
        end
    end

    def manualTracking
        report_id = params[:reportId]
        w = WorkOrderDetail.find_by_ID(report_id)
        tool = w.attributes
        tool[:AssetID] = asset_id
        tool[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
        ::V1::EventBus::EventBusService.publish 'metalsa/startTracking', tool
        render json: { "success": true, :data => w }
    end

    def escalationLog
        report_id = params[:reportId]
        result = []
        w = WorkOrderLog.includes(:report_status, :work_order_detail).by_asset(asset_id).where(:WorkOrderDetailID => report_id).each do |w|
            type = w.report_status
            r = w.work_order_detail
            e = r.try(:escalation_rule)
            t = r.try(:tool)
            open_minutes = 0
            open_seconds = 0
            if r.try(:OpenSecond)
                open_minutes = r.try(:OpenSecond)/60
                open_seconds = r.try(:OpenSecond)
            end
            #FIXME Grouped Verify
            data = { logId: w.ID, 
                reportId: w.WorkOrderDetailID, 
                type: type.DescStatus, 
                logCreatedAt: w.CreatedAt, 
                data: w.Message, 
                escalationLevel: e.try(:LevelEscalation), 
                closedAt: w[:EndAt], 
                open_minutes: open_minutes.round , 
                report_type: r.ReportStatusID, 
                report_division: r.ReportDivision, 
                reportCreatedAt: r.StartAt, 
                report_number: r.ReportNumber, 
                report_group: r.WorkOrderDetailGroupID.present?, 
                tool_code: t.try(:DescTool), 
                reportClosedAt: r.EndAt, 
                open_seconds: open_seconds}
            result << data
        end

        w = WorkOrderDetail.find_by_ID(report_id)
        rules = []
        EscalationRule.where(:EscalationTypeID => w.ReportStatusID).each do |rule|
            rules << { level: rule.LevelEscalation, label: rule.DescEscalationRule, id: rule.ID, limit: rule.LimitEscalation } 
        end
        
        render json: { 
            "success": true, 
            :data => result, 
            :escalationLevel => rules
        }
    end

    def getReport
        report_id = params[:reportId]
        w = WorkOrderDetail.find_by_ID(report_id)
        i = w.try(:issue)
        it = i.try(:issue_type)
        code = i.DTCode
        if w.EscalationTypeID == 2
            code = i.COCode
        end
        desc = code+' - '+i.DescIssue
        wo_maximo = WorkOrderMaximo.find_by(:wod_id => w.ID)
        result = {
            report: w.ID, 
            reportCreatedAt: w.StartAt, 
            reportClosedAt: w.EndAt, 
            escalationLevel: w.EscalationRuleID, 
            report_number: w.ReportNumber, 
            createdAt: w.CreatedAt, 
            color: it.Color, 
            issueType: it.DescIssueType, 
            desc: desc, 
            WorkOrderGroupID: w.WorkOrderDetailGroupID, 
            report_type: w.EscalationTypeID,
            show_wo: wo_maximo.present?,#(wo_maximo.try(:wo_num).present? && wo_maximo.try(:workorder_id).present?),
            wo_maximo: wo_maximo.try(:wo_num),
            wo_maximoMsg: wo_maximo.try(:message),
            wo_maximo_id: wo_maximo.try(:workorder_id)
        }
        render json: { 
            "success": true, 
            :data => result
        }
    end


    def unmerge
        parentId = params[:reportId]
        reports = []
        WorkOrderDetailGroup.where("ParentID = ? AND Grouped = 1", parentId).each do |w|
            reports << { id: w.WorkOrderDetailID, seconds: w.OpendSeconds }
            f = WorkOrderDetail.find_by(:ID => w.WorkOrderDetailID)
            seconds = (f.StartAt).to_time+w.OpendSeconds
            escalation = f.EscalationRuleID
            if w.OpendSeconds < 60
                escalation = 1
            end
            data = { :OpenSecond => w[:OpendSeconds], :ReportGroup => nil, :IssueID => w.IssueID, :EndAt => seconds, :EscalationRuleID => escalation }
            f.update_columns(data)
            w.destroy
        end
        render json: { "success": true, :data => reports, :id => parentId }
    end

    def mergeDowntimes
        data = []
        report = params[:current]
        list = params[:list]
        seconds = 0
        first = true
        idParent = 0
        startAt = DateTime.now
        endAt = DateTime.now
        

        group = Api::V1::ReportController.createGroup(report[:report], seconds, report[:issue], asset_id)
        
        list.each do |item|
            f = WorkOrderDetail.find_by(:ID => item[:report])
            # Acumulando segundos
            seconds += f[:OpenSecond]
            data = { :EscalationTypeID => item[:report_type] , :WorkOrderDetailGroupID => group[:id]}
            f.update_columns(data)
            if first
                idParent = item[:report]
                startAt = f[:StartAt]
                endAt = startAt
                first = false
            end
            if endAt < f[:EndAt]
                endAt = f[:EndAt]
            end
        end
        
        data = { :GroupSeconds => seconds, :ParentID => idParent, :StartAt => startAt, :EndAt => endAt}
        group.update_columns(data)

        data1 = group.attributes

        data1[:AssetID] = asset_id
        data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
        # TODO: Por revisar en Notifications y luego Broker
        ::V1::EventBus::EventBusService.publish 'metalsa/reportGrouped', data1
        render json: { "success": true, :data => group }
  
    end

    def self.createGroup(idParent, seconds, issueID, assetID)
        #Save Log
        work = WorkOrderDetail.find(idParent)
        data = { ParentID: idParent, GroupSeconds: seconds, IssueID: issueID, ReportNumber: work[:ReportNumber], ReportDivision: work[:ReportDivision], EscalationTypeID: work[:EscalationTypeID], WorkOrderDetailID: idParent, AssetID: assetID}
        x = WorkOrderDetailGroup.create(data)   
        return x 
    end
    
    def splitDowntimes
        data = []
        userId = Auth::Current.user['id']
        list = params[:list]
        parent = list.last()
        #Get original downtime
        f = WorkOrderDetail.find(parent[:report])
        #first update parent
        if parent[:report_division] == 'A'
            open_minutes = parent[:open_minutes]
            end_at = f.EndAt
            start_at = end_at - open_minutes.minutes

                #FIXME grouped - POR VERIFICAR
                data = { :OpenSecond => (open_minutes*60).round, :WorkOrderDetailGroupID => nil, :IssueID => parent[:issue],
                    :ReportDivision => parent[:report_division], :EscalationRuleID => f[:EscalationRuleID], 
                    :EscalationTypeID => parent[:report_type], :ReportStatusID => f[:ReportStatusID], :ToolID => f[:ToolID], 
                    :WorkOrderID => f[:WorkOrderID], :ReportNumber => f[:ReportNumber], :StartAt => start_at,
                    :EndAt => end_at , :CreatedAt => f[:CreatedAt], :AssetID => asset_id
                }
            #Historic split downtime
            Api::V1::ReportController.historicDowntime(f[:ID], parent[:report], 0, asset_id)
            f.update_columns(data)
        end
        #coc = Issue.all.map(&:COCode)
        start_at = Time.parse(parent[:createdAt]).utc
        end_at = Time.parse(parent[:closedAt]).utc
        list.each do |value|
            #ignore the parent update
            if value[:report_division] != 'A'
                open_minutes = value[:open_minutes]
                end_at = start_at + open_minutes.minutes
                data = { :OpenSecond => (open_minutes*60).round,  :IssueID => value[:issue],
                    :ReportDivision => value[:report_division], :EscalationRuleID => f[:EscalationRuleID], 
                    :EscalationTypeID => value[:report_type], :ReportStatusID => f[:ReportStatusID], :ToolID => f[:ToolID], 
                    :WorkOrderID => f[:WorkOrderID], :ReportNumber => f[:ReportNumber], :StartAt => start_at,
                    :EndAt => end_at , :CreatedAt => f[:CreatedAt], :AssetID => asset_id
                }
                Rails.logger.info(data)
                start_at = end_at
                wod = WorkOrderDetail.create(data)
                log = { CreatedBy: userId, Message: nil, ReportStatusID:10, UserID: userId,  WorkOrderDetailID: wod[:ID], CreatedAt: f.CreatedAt, AssetID: asset_id }
                WorkOrderLog.create(log)
                Api::V1::ReportController.historicDowntime(wod[:ID], parent[:report], 0, asset_id)
            end
        end        

        data1 = f.attributes
        data1[:AssetID] = asset_id
        data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
        ::V1::EventBus::EventBusService.publish 'metalsa/reportDivided', data1
        render json: { "success": true, :data => [] }
    end

    def getHistoric
        reportId = params[:reportId]
        result = [] 
        WorkOrderDetailGroup.where(:ParentID => reportId).each do |w| 
            work = WorkOrderDetail.find_by(:ID => w[:WorkOrderDetailID])
            i = work.issue
            color = nil
            code = nil
            desc = nil
            issueType = '--'
            if i
                it = i.issue_type
                code = work[:ReportStatusID] == 1 ? i.DTCode : i.COCode
                issueType = it.DescIssueType
                desc = "#{code} - #{i.DescIssue}"
                color = it.Color
            end
            data = {
                report_type: w.EscalationTypeID, open_minutes: w.try(:OpendSeconds)/60, report_number: w.ReportNumber, createdAt: work[:EndAt], report_statusID: work.ReportStatusID,
                code: code, issueType: issueType, desc: desc, color: color, work: work, issue: work[:IssueID], report_division: work[:ReportDivision], open_seconds: w.try(:OpendSeconds),
                log: [{
                    type: 'report-closed', reportCreatedAt: work[:CreatedAt]
                }]
            }
            result << data
        end
        render json: { "success": true, :data => result }
    end

    def self.historicDowntime(id, parent, type, asset_id)
        #Save Log
        work = WorkOrderDetail.find(id)
        data = { ParentID: parent, GroupSeconds: work[:OpenSecond], IssueID: work[:IssueID], ReportNumber: work[:ReportNumber], ReportDivision: work[:ReportDivision], EscalationTypeID: work[:EscalationTypeID], WorkOrderDetailID: id, AssetID: asset_id }
        x = WorkOrderDetailGroup.create(data)       
    end

    def getWorkOrdersMaximo        
        date = params[:day]

        dateRange = ::V1::SensaiShifts.get_shifts only_schema, date
        turnoActual = dateRange["actualShift"]

        result = WorkOrderMaximo.get_data(turnoActual[:startAt], turnoActual[:endAt], asset_id)
        render json: { "success": true, :data => result, :shift => turnoActual }
    end

    def createWorkOrderMaximo
        dtId = params[:dtId]
        wom = WorkOrderMaximo.find_by(:wod_id => dtId)
        created = {}
        if !wom
            current_user = Auth::Current.user
            username = !current_user['username'] ? '-' : current_user['username']
            woNum = params[:wonum]
            workOrderId = params[:workorderid]
            description = params[:description]
            message = params[:message]
            user = params[:user]
            tadi = params[:tadi]
            location = params[:location]
            orgid = params[:orgid]
            siteid = params[:siteid]
            wopriority = params[:wopriority]
            wod = WorkOrderDetail.includes(:issue, :escalation_rule, :tool).where({:id => dtId})
            wod.each do |w|
                i = w.try(:issue)
                t = w.try(:tool)
                it = i.try(:issue_type)
                code = ''
                desc = ''
                issue_type = '--'
                if w.try(:issue)
                    if w.EscalationTypeID == 1
                        code = i.DTCode
                    else
                        code = i.COCode
                    end
                end
                area = it.try(:DescIssueType)
                created = WorkOrderMaximo.create(
                    :creation_type => 'Automatica',
                    :dt_type => w.EscalationTypeID,
                    :wod_id => dtId,
                    :wo_num => woNum,
                    :workorder_id => workOrderId,
                    :wo_created_at => Time.now,
                    :user_req => user,
                    :tadi_req => tadi,
                    :tool => t.try(:DescTool),
                    :area => area,
                    :issue_type => code,
                    :description => description,
                    :asset_id => w.AssetID,
                    :location => location,
                    :site_id => siteid,
                    :org_id => orgid,
                    :wo_priority => wopriority,
                    :wod_start_at => w.StartAt,
                    :wod_end_at => w.EndAt,
                    :status => 'ABIERTA',
                    :message => message,
                    :LAST_UPDATED_BY => username,
                    :CREATED_BY => username
                )
                Api::V1::ReportController.addLogWOM(created.id, w.EscalationTypeID, woNum, workOrderId, area, code, description, 'ABIERTA', message, username)
                data1 = w.attributes
                data1[:AssetID] = asset_id
                data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
                ::V1::EventBus::EventBusService.publish 'metalsa/failureIdentified', data1
            end        
        else 
            created.id = 0
        end
        render json: { "success": true, :id => created.id } 
    end

    def updateWorkOrderMaximo
        dtId = params[:dtId]
        wom = WorkOrderMaximo.find_by(:wod_id => dtId)
        created = {}
        if wom
            current_user = Auth::Current.user
            username = !current_user['username'] ? '-' : current_user['username']
            id = wom.id
            woNum = params[:wonum]
            workOrderId = params[:workorderid]
            description = params[:description]
            message = params[:message]
            tadi = params[:tadi] ? wom.tadi_req : params[:tadi]
            wod = WorkOrderDetail.includes(:issue, :escalation_rule, :tool).where({:id => dtId})
            status = params[:status] == '' ? wom.status : params[:status]
            description = params[:description]
            wod.each do |w|
                i = w.try(:issue)
                t = w.try(:tool)
                it = i.try(:issue_type)
                code = ''
                desc = ''
                issue_type = '--'
                if w.try(:issue)
                    if w.EscalationTypeID == 1
                        code = i.DTCode
                    else
                        code = i.COCode
                    end
                end
                area = it.try(:DescIssueType)
                woNum = !woNum ? wom.wo_num : woNum
                workOrderId = !workOrderId ? wom.workorder_id : workOrderId
                created = wom.update_columns(
                    :dt_type => w.EscalationTypeID,
                    :wo_num => woNum,
                    :workorder_id => workOrderId,
                    :area => area,
                    :issue_type => code,
                    :description => description,
                    :wod_start_at => w.StartAt,
                    :wod_end_at => w.EndAt,
                    :status => status,
                    :message => message,
                    :LAST_UPDATED_BY => username,
                    :LAST_UPDATE_DATE => Time.now
                )
                Api::V1::ReportController.addLogWOM(wom.id, w.EscalationTypeID, woNum, workOrderId, area, code, description, status, message, username)
                data1 = w.attributes
                data1[:AssetID] = asset_id
                data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
                ::V1::EventBus::EventBusService.publish 'metalsa/failureIdentified', data1
            end        
        else 
            id = 0
        end
        render json: { "success": true, :id => id } 
    end

    def self.addLogWOM(wom_id, dt_type, wo_num, workorder_id, area, issue_type, description, status, message, user)
        data = { wom_id: wom_id, dt_type: dt_type, wo_num: wo_num, workorder_id: workorder_id, area: area, issue_type: issue_type, description: description, status: status, message: message, LAST_UPDATED_BY: user, CREATED_BY: user}
        x = WorkOrderMaximoLog.create(data)
    end

    def existsWorkOrderMaximo
        dtId = params[:dtId]
        wom = WorkOrderMaximo.find_by(:wod_id => dtId)
        created = {}
        if wom
            render json: { "success": true, "exists": true, :wom => wom }
        else
            render json: { "success": true, "exists": false }
        end
    end

    def getToolCurrentDT
        report_id = params[:reportId]
        w = WorkOrderDetail.find_by_ID(report_id)
        t = w.try(:tool)
        result = {
            report: w.ID, 
            toolId: t.id, 
            tool: t.DescTool
        }
        render json: { 
            "success": true, 
            :data => result
        }
    end

end