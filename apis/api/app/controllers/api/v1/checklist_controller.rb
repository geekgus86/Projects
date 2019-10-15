class Api::V1::ChecklistController < ApplicationController

  before_action :authenticate 

  def create 
    created_checklist = CheckList.create(:CheckListTypeID => params[:type], :DescCheckList => params[:title], :AssetID =>asset_id )    
    params[:sections].each do |section|
      created_section = CheckListSection.create(:CheckListID => created_checklist.ID, :DescSection => section[:name],:AssetID =>asset_id)
      section[:questions].each do |question|
        created_question = CheckQuestion.create(:CheckListSectionID => created_section.ID, :DescQuestion => question[:question],:AssetID =>asset_id )
      end
    end

    render json: created_checklist
  end

  def getChecklistShift
    shift = params[:shift]
    machine = params[:machine]
    result = {}
    if machine && shift
      dateRange = Services::SensaiDates.get_turns(nil) #Nil porque baah da igual siempre es el turno actual

      currentShift = dateRange['turnActual']
      currentShift = dateRange[currentShift.to_sym]
      #answers = CheckListAnswer.shift_answers(currentShift[:startAt], currentShift[:endAt], 7).first
      answers = CheckListAnswer.shift_answers(currentShift[:startAt], currentShift[:endAt], 7, asset_id).first
      if answers
        result = answers.attributes
        result[:shift] = shift
      else
        result = []
      end
    end
    render json: {
      success: true,
      data: result
    }
  end

  def save
    work_order_id = params[:work_order_id]
    daiy_order_id = params[:daily_work_order]
    check_list_id = params[:checklist_id]
    checklistType = params[:checklist_type]
    tool = params[:tool]
    startAt = params[:inicio]
    endAt = params[:fin]
    userId = Auth::Current.user['id']
    machine_id = params[:machine_id]
    answers = params[:answers]   
    tadi = params[:tadi]
    success = false
    error = ""
    user = {}
    if !answers
      success = false
      error = I18n.t(:checklist_wasnt_sent)
    else
      if tadi
        user = User.find_by_tadi(tadi)
        if !user
          success = false
          error = I18n.t(:TADI_not_found)
        end
        userId = user.try(:id)
      end

      checklist = CheckList.new(WorkOrderID: work_order_id, CheckListTypeID: checklistType, ToolID: tool,  AssetID: asset_id)
      
      unless work_order_id
        wo = DailyWorkOrder.by_asset(asset_id).where("ToolID is not null").last
        checklist.ToolID = wo.try(:ToolID)
      end
      answers.each do |a|
        section_id = a[:section_id]
        question_id = a[:checklistitem_id]
        response = a[:response]
        comment = a[:comment]
        # f = CheckListAnswer.find_by(
        #   :WorkOrderID => work_order_id,
        #   :CheckListID => check_list_id,
        #   :CheckListSectionID => section_id,
        #   :CheckListQuestionID => question_id,
        #   :AssetID => machine_id
        # )
        data = {
          #:CheckListID => check_list_id,
          :CheckListSectionID => section_id,
          :CheckListQuestionID => question_id,
          :Answer => response,
          :AssetID => asset_id,
          :CreatedBy => nil,
          :Comment => comment
        }
        if work_order_id
          data[:WorkOrderID] = work_order_id
        end

        checklist.check_list_answers << CheckListAnswer.new(data)
        #puts a.errors.full_messages
      end
    end
    success = checklist.save
    error = checklist.errors.full_messages

    render json: {
      success: success,
      error: error,
      data: { nombre: user[:name], apellidoPaterno: '' }
    }
  end

  def saveLog
    render json: {
      success: true,
      data: {}
    }
  end

  def show
    render json: { data: { datos: ::V1::CheckListService.get_checklist(params) }}
  end

end
