class V1::CheckListService

  class << self

    def get_checklist(check_list_params)
      initial_date = Time.zone.parse(check_list_params[:start_date]).utc
      final_date = Time.zone.parse(check_list_params[:end_date]).utc
      checklists = CheckList.by_type(check_list_params[:id]).where(CreatedAt: initial_date..final_date).order('CheckList.CreatedAt ASC')
      checklists =  if check_list_params[:id].to_i == 2
        checklists.by_tool(check_list_params[:tool])
      else
        checklists.by_group(check_list_params[:group])
      end
      check_list_answers = []
      checklists.limit(7).map{|c| check_list_answers += c.check_list_answers} #.limit(7)
      grouped_check_list_answers = check_list_answers.group_by do |check_list_answer|
        check_list_answer.CheckListID #CreatedAt.change({hour: 0, min: 0, sec: 0})
      end

      result = {
          header: {
              date: []
          },
          datos: {

          }
      }

      grouped_check_list_answers.keys.each do |key|
        result[:header][:date] << get_check_list_header(grouped_check_list_answers[key].last)
        grouped_check_list_answers[key].each do |answer|
          section = "#{answer.check_list_section[:DescSection]}".to_sym
          question = "#{answer.check_question[:DescQuestion]}".to_sym
          unless result[:datos][section]
            result[:datos][section] = {
                "#{question}": {
                    data: []
                }
            }
          end
          unless result[:datos][section][question]
            result[:datos][section][question] = {
                data: []
            }
          end
          result_answer = get_answer(answer)
          result[:datos][section][question][:data].push(result_answer)
          # unless result[:datos][section][question][:data].any? do |existing_answer|
          #   existing_answer.keys[0] == result_answer.keys[0]
          # end
          #   result[:datos][section][question][:data].push(result_answer)
          # end
        end
      end
      result

    end

    def get_checklist1(check_list_params)
      initial_date = DateTime.parse check_list_params[:start_date]
      final_date = DateTime.parse check_list_params[:end_date]

      @check_list_answers = CheckListAnswer
                                .where(CreatedAt: initial_date..final_date)
                                .includes(:work_order, :check_list, :check_list_section)
                                .references(:work_order, :check_list)
                                .where('CheckList.CheckListTypeID = ?', check_list_params[:id])
                                .where('WorkOrder.ToolID = ?', check_list_params[:tool])
                                .order('CheckListAnswer.CreatedAt ASC')

      @grouped_check_list_answers = @check_list_answers.group_by do |check_list_answer|
        check_list_answer.CreatedAt.change({hour: 0, min: 0, sec: 0})
      end

      result = {
          header: {
              date: []
          },
          datos: {

          }
      }

      @grouped_check_list_answers.keys.each do |key|
        result[:header][:date].push get_check_list_header(@grouped_check_list_answers[key].last)
        @grouped_check_list_answers[key].each do |answer|
          section = "#{answer.check_list_section[:DescSection]}".to_sym
          question = "#{answer.check_question[:DescQuestion]}".to_sym
          unless result[:datos][section]
            result[:datos][section] = {
                "#{question}": {
                    data: []
                }
            }
          end
          unless result[:datos][section][question]
            result[:datos][section][question] = {
                data: []
            }
          end
          result_answer = get_answer(answer)
          unless result[:datos][section][question][:data].any? do |existing_answer|
            existing_answer.keys[0] == result_answer.keys[0]
          end
            result[:datos][section][question][:data].push(result_answer)
          end
        end
        end
      result
    end

    def find_sections(section_ids)
      CheckListSection.find section_ids
    end

    def get_check_list_header(check_list_answer)
      {
          day1: check_list_answer.CreatedAt.strftime('%A'),
          day2: check_list_answer.CreatedAt.strftime('%b %d'),
          timeTotal: check_list_answer.CreatedAt.strftime('%H:%M:%S'),
          user: check_list_answer.check_list.user.name, #User.find(check_list.CreatedBy).username,
          group: "#{I18n.t(:group)} #{check_list_answer.try(:check_list).try(:user).try(:team).try(:group).try(:Alias)}"
      }
    end

    def get_answer(check_list_answer)
      {
          "#{check_list_answer.CreatedAt.strftime('%b %d')}": {
              status: check_list_answer.Answer,
              role: "#{I18n.t(:group)} #{check_list_answer.try(:check_list).try(:user).try(:team).try(:group).try(:Alias)}", # Team Member Grupo A
              comment: check_list_answer.Comment,
              user: check_list_answer.check_list.user.name
          }
      }
    end
  
  end

end