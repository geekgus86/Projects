class Api::V1::DailyreportController < ApplicationController
    before_action :authenticate 
    def prepareProduction
        data = DailyWorkOrder.by_asset(asset_id).where(:DailyStatusID =>[1,2]).first
        result = {}  
        @dailyReports = 0
        if data
            result = data.attributes
            result[:WorkOrderDetail] = data.work_order_detail
            @dailyReports = DailyWorkOrder.by_asset(asset_id).where(:WorkOrderID => result['WorkOrderID'], :DailyStatusID => 3).length
        end
        if(@dailyReports>=2)
            render json: { "success": false, :data => [] }
        else
            #Create if data not exists
            #data = DailyWorkOrder.where(:ID =>[200]).first
            if !data
                lastWorkOrder = WorkOrder.by_asset(asset_id).last()
                data = DailyWorkOrder.create(:DailyStatusID => 1, :WorkOrderID => lastWorkOrder.ID, :AssetID => asset_id, :StartAt => Time.now.utc)
            end

            if !data.tool
                result[:tool] = []
            else
                result[:tool] = data.tool
            end
            render json: { "success": true, :data => result }
        end
    end

    def getRunningProduction
        result = {}
        data = DailyWorkOrder.by_asset(asset_id).find_by(:DailyStatusID => 2, :EndAt => nil)    

        if data
            result = data.attributes     
            result[:WorkOrderDetail] = data.work_order_detail.attributes
            result[:WorkOrderDetail]["OpenMinutes"] = data.work_order_detail.OpenMinutes.round(2)

            result[:tool] = data.tool
        end
        
        render json: { "success": true, :data => result }
    end

    def getValidatedProduction
        result = {}
        data = DailyWorkOrder.by_asset(asset_id).find_by_DailyStatusID(3)    

        if data
            result = data.attributes     
            result[:WorkOrderDetail] = data.work_order_detail.attributes
            result[:WorkOrderDetail]["OpenMinutes"] = data.work_order_detail.OpenMinutes.round(2)

            result[:tool] = data.tool
        end
        
        render json: { "success": true, :data => result }
    end

    def editValidatedProduction
        prodId = params[:id]
        result = {}
        if prodId      
            data = DailyWorkOrder.find_by_ID(prodId) 
            data.update_columns(:DailyStatusID => 1, :WorkOrderDetailID => nil)
            result = data.attributes
            result[:tool] = data.tool
        end
        ::V1::EventBus::EventBusService.publish 'metalsa/editProduction', {:value => true, :AssetID => asset_id, :dbSchema => {:DB => get_database, :schema => schema, :asset => only_schema}}
        render json: { "success": true, :data => result }
    end

    def getVerifiedProduction             
        result = {}
        data = DailyWorkOrder.by_asset(asset_id).find_by_DailyStatusID(4)
        result = {}
        if data
            result = data.attributes
            
            result[:WorkOrderDetail] = data.work_order_detail.attributes
            result[:WorkOrderDetail]["OpenMinutes"] = data.work_order_detail.OpenMinutes.round(2)

            result[:tool] = data.tool
        end
        render json: { "success": true, :data => result }
    end

    def setToolsParams
        result = {}
        prodId = params[:production]
        paramsObj = params[:data]

        if prodId      
            dor = DailyWorkOrder.find_by_ID(prodId)
            dor.update_columns(
                :DesignSpeed => paramsObj[:velocidad],
                :UnitManual => paramsObj[:piezas],
                :JulianCode => paramsObj[:num_juliano],
                :StartAt => paramsObj[:inicio],
                :UnitAuto => paramsObj[:golpes_total],
                :RolledNo => paramsObj[:num_rollo],
                :RolledLot => paramsObj[:lote_rollo],
                :LoteBlanco => paramsObj[:blanco]
            )
            
            result = dor.attributes
            result[:tool] = dor.tool

            if dor.UnitAuto != 0
                ::V1::EventBus::EventBusService.publish 'metalsa/objectiveProd', {:value => dor.UnitAuto, :AssetID => asset_id, :dbSchema => {:DB => get_database, :schema => schema, :asset => only_schema}}
            end
        end

        render json: { "success": true, :data => result }
    end

    def verifyProduction
        prodId = params[:production]
        endAt = params[:data][:fin]

        data = DailyWorkOrder.find_by_ID(prodId)
        data.update_columns(
            :DailyStatusID => 4, :EndAt => endAt
        )

        render json: { "success": true, :data => data }
    end

    def getLog
        day = params[:day]
        dateRange = Services::SensaiDates.get_turns(day)

        turnoActual = dateRange['turnActual']
        turnoActual = dateRange[turnoActual.to_sym]

        dateRange = dateRange[:range]
        data = []
        result = DailyWorkOrder.includes(:work_order_detail,:rolled_steel_plate).where(:DailyStatusID => [4,5] ).by_asset(asset_id).between_date(dateRange[:startAt].in_time_zone('America/Monterrey').strftime('%Y-%m-%d %H:%M:%S'), dateRange[:endAt].in_time_zone('America/Monterrey').strftime('%Y-%m-%d %H:%M:%S') )
        
        result.each do |r|
            elem = {}
            elem = r.attributes 
            if r.work_order_detail
                elem[:WorkOrderDetail] = r.work_order_detail.attributes
                elem[:WorkOrderDetail]["OpenMinutes"] = r.work_order_detail.OpenMinutes.round(2)
            end

            elem[:Tool] = r.tool 
            elem[:RolledSteelPlate] = r.rolled_steel_plate           
            data << elem
        end
        workOrders= WorkOrder.by_asset(asset_id).get_data(dateRange[:startAt], dateRange[:endAt])
        render json: { 
            "success": true, 
            :data => data, 
            :workOrders => workOrders,
            :day => dateRange[:startAt].in_time_zone('America/Monterrey').strftime('%Y-%m-%d')
        }
    end    

    def closeProduction
        result = {}
        prodId = params[:production]
        
        data = params[:data]        
        attrs = { DailyStatusID: 5, UnitAuto: data[:UnitAuto], UnitScrap: data[:UnitScrap], UnitRework: data[:UnitRework] }
        if data[:termino_rollo] == 1
            attrs[:RolledLot] = data[:loteRollo2]
            attrs[:RolledNo] = data[:numRollo2]
        end

        if prodId
            result = DailyWorkOrder.find_by_ID(prodId)
            result.update_columns(attrs)         
            #global.Ewa.io.emit 'prod-closed', response sockets pendientes :)
        end
        render json: { "success": true, :data => result }
    end

    def setCurrentTool
        production_id = params[:production]
        tool_id = params[:tool]
        data = DailyWorkOrder.find_by_ID(production_id)
        result = {}

        if data
            data.update_columns(:ToolID => tool_id)
            result = data.attributes
            
            #result[:WorkOrderDetail] = data.work_order_detail.attributes
            #result[:WorkOrderDetail]["OpenMinutes"] = data.work_order_detail.OpenMinutes.round(2)
            result[:tool] = data.tool 
            tool = Tool.find_by_ID(tool_id).attributes
            tool[:AssetID] = asset_id
            tool[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
            ::V1::EventBus::EventBusService.publish 'metalsa/nextTool', tool

            render json: { "success": true, :data => result }
        else
            render json: { "success": false, :error => I18n.t(:DWO_not_found) }            
        end
    end

    def setChangeoverReqs
        reqs = params[:reqs]
        workorder = params[:production]
        order = DailyWorkOrder.find(workorder)

        if order
            checklist = CheckList.new(WorkOrderID: workorder, CheckListTypeID: 3,:AssetID =>asset_id )
            checklist_type = CheckListType.find_by_ID 3
            checklist_type.check_list_sections.each do |section|
                section.check_questions.each do |question|
                    data = {
                        :WorkOrderID => workorder,
                        :CheckListSectionID => section.ID,
                        :CheckListQuestionID => question.ID,
                        :Answer => 1,
                        :AssetID => asset_id
                    }
                    CheckListAnswer.new(data)
                end
            end
        end
        ::V1::EventBus::EventBusService.publish 'metalsa/checklistReady', {:value => true, :checks => reqs, :AssetID => asset_id, :dbSchema => {:DB => get_database, :schema => schema, :asset => only_schema}}

        render json: { "success": true, :data => {} }
    end

    def validateProduction
        render json: { success: true, data: ::V1::DailyProductionReportsService.validate_report(params, only_schema, asset_id) }
    end
end