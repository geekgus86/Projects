class V1::InspectionService
  class << self
    def get_tool_trends(tool_id)
      end_date = DateTime.now
      start_date = end_date - 10.days
      get_inspections_by_day tool_id, start_date, end_date
    end

    def get_today_inspections(tool_id)
      end_date = DateTime.now
      start_date = end_date - 1.day
      get_inspections_by_day tool_id, start_date, end_date
    end

    def get_inspections_by_day(tool_id, start_date, end_date)
      @inspections = Inspection.where(ToolID: tool_id, InspectionAt: start_date..end_date)
      inspections = @inspections.as_json
      day_inspections = inspections.group_by do |inspection|
        inspection['CreatedAt'].strftime('%d')
      end
      day_inspections.values.each do |day_inspection|
        day_inspection.each do |inspection|
          inspection['Inspector'] = User.find(inspection['InspectorID']).as_json
        end
      end
      day_inspections.values
    end

    def create_inspection(params)
      @inspection = Inspection.new params
      @inspection.InspectorID = Auth::Current.user['id']
      # @inspection.SecuencialNumber = Inspection.last.ID + 1
      @inspection.InspectionAt = Time.now.in_time_zone('America/Monterrey').utc
      @inspection.save
      @inspection
    end

    def get_inspection_check_list_approvals(approval_params)
      order = approval_params[:order] || 'desc'
      sort = approval_params[:sort] || 'InspectionID'
      @approvals = InspectionApproval
                    .where(InspectionCheckID: approval_params[:check_list_id])
                    .order("#{sort} #{order}")
                    .limit(approval_params[:limit])
      flat_approvals = @approvals.as_json
      mapped_approvals = []
      flat_approvals.each do |approval|
        mapped_approvals.push(new_mapped_approval(approval))
      end
      mapped_approvals
    end

    def new_mapped_approval(approval)
      new_approval = Utils::MapObject.map_object(approval, APPROVALS_MAP)
      check_list = InspectionCheckList.find approval['InspectionCheckID']
      new_approval['checkListId'] = Utils::MapObject.map_object(check_list, CHECKLIST_MAP)
      sequential_number = Inspection.find(approval['InspectionID'])
      new_approval['inspectionId'] = Utils::MapObject.map_object(sequential_number, INSPECTION_MAP)
      new_approval
    end

    def get_inspection_report_by_work_order(params)
      work_order_id = params[:work_order_id]
      @inspections = Inspection.where(WorkOrderID: work_order_id)
      return [] if !work_order_id || @inspections.length == 0
      tool_id = @inspections[0].ToolID

      @InspectionCheckLists = InspectionCheckList.where(ToolID: tool_id)

      @InspectionCheckLists = @InspectionCheckLists.map do |inspectionCheckList|
        {
          "id": inspectionCheckList.ID,
          "Item": inspectionCheckList.Consecutive,
          "#{I18n.t(:characteristic)}": inspectionCheckList.Feature,
          "#{I18n.t(:specification)}": inspectionCheckList.Spec,
          "#{I18n.t(:instrument)}": inspectionCheckList.DescInstrument
        }
      end

      @inspections = @inspections.map do |inspection| 
        new_inspection = {}
        new_inspection[:element] = inspection.inspection_approvals.map do |ia|
          {
            "id": ia.InspectionCheckID,
            "value": ia.InspectionValue,
            "approve": ia.InspectionApprove,
            "type": ia.inspection_check_list.InputType
          }
        end
        puts inspection
        puts new_inspection

        new_inspection[:result] = inspection.Success;
        new_inspection[:date] = inspection.InspectionAt;
        new_inspection[:message] = inspection.Remark;
        new_inspection
      end

      return { checkLists: @InspectionCheckLists, inspections: @inspections }

      # @inspections.length

      # day = params[:day]
      # start_date =  Time.zone.parse(day).utc.change({hour: 11, min: 0, sec: 0})
      # end_date = start_date + 1.day
      # tool_id = params[:tool_id]

      # @InspectionCheckLists = InspectionCheckList.where(ToolID: tool_id)

      # @InspectionApprovals = InspectionApproval
      #                         .includes(:inspection)
      #                         .references(:inspection)
      #                         .where(
      #                           'Inspection.InspectionAt': start_date..end_date,
      #                           'Inspection.ToolID': tool_id
      #                         )

      # @InspectionApprovals = @InspectionApprovals.group_by { |inspectionApproval| inspectionApproval.InspectionID }

      # inspections = @InspectionApprovals.map do |inspectionApproval, element|
      #   {
      #     result: element[0].inspection.Success,
      #     element: element.map do |e|
      #       {
      #         "id": e.InspectionCheckID,
      #         "value": e.InspectionValue,
      #         "approve": e.InspectionApprove,
      #         "type": e.inspection_check_list.InputType
      #       }
      #     end,
      #     date: element[0].inspection.InspectionAt,
      #     message: element[0].inspection.Remark
      #   }
      # end

      # @InspectionCheckLists = @InspectionCheckLists.map do |inspectionCheckList|
      #   {
      #     "id": inspectionCheckList.ID,
      #     "Item": inspectionCheckList.Consecutive,
      #     "Caracteristica": inspectionCheckList.Feature,
      #     "Especif.": inspectionCheckList.Spec,
      #     "Instrumento": inspectionCheckList.DescInstrument
      #   }
      # end

      # return { checkLists: @InspectionCheckLists, inspections: inspections }

    end

    APPROVALS_MAP = {
      InspectionID: 'inspectionId',
      InspectionCheckID: 'checkListId',
      InspectionValue: 'value'
    }

    CHECKLIST_MAP = {
        InputType: 'input_type',
        Tolerance: 'tolerancia',
        InferiorTolerance: 'tolerancia_inf',
        SuperiorTolerance: 'tolerancia_sup'
    }

    INSPECTION_MAP = {
        SecuencialNumber: 'secuentialNumber'
    }
  end
end