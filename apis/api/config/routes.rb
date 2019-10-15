Rails.application.routes.draw do
  
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  apipie
  namespace :api do
    namespace :v1 do

      namespace :asset do
        resources :assets do
          member do
            get 'image'
          end
        end
      end

      resources :kpi do
        collection do
          get 'getKpis'
          get 'getAfectacionEqes'
          get 'getShiftKpis'
          get 'getGlobalIndicators'
          get 'getParetosDowntime'
          get 'getParetosChangeover'
          get 'getToolsChangeover'
          get 'getToolsPerformance'
          get 'getHourStrokes'
        end
      end

      resources :daily_production_reports do
        collection do
          get 'get_om'
          get 'index'
          get 'get_real_strokes_header'
          get 'get_shift_detail'
          get 'get_real_strokes_tool'
        end
      end
	  
	  resources :daily_production_reports_enhanced do
        collection do
          get 'get_om'
          get 'index'
          get 'get_daily_production_report'
          get 'get_real_strokes_header'
          get 'get_shift_detail'
          get 'get_real_strokes_tool'
        end
      end


      resources :machine do
        collection do
          get 'checkout'
          post 'checkin'
          post 'getLog'
          get 'getCurrentFailure'
          get 'getUserMachine'
          post 'getMachineChecklist'
          post 'setToolsParams'
        end
      end

      resources :dailyreport do
        collection do
          get 'prepareProduction'
          get 'getVerifiedProduction'
          get 'getValidatedProduction'
          get 'getRunningProduction'
          post 'getLog'
          post 'closeProduction'
          post 'setToolsParams'
          post 'setCurrentTool'
          post 'setChangeoverReqs'
          post 'validateProduction'
          post 'verifyProduction'
          post 'editValidatedProduction'
        end
      end

      resources :try_out do
        collection do
          post 'startTryout'
          post 'closeTryout'
          post 'authorizationTryOut'
        end
      end

      resources :network_log do
        collection do
          post 'save_log'
        end
      end

      resources :forum do
        collection do
          post 'getComment'
          post 'newComment'
        end
      end

      resources :issue_type

      resources :sensor_value do
        collection do
          get 'get_sensors'
          get 'get_values_log'
        end
      end

      resources :tool do 
        collection do
          get "get_smart_tools"
        end
      end

      get 'tools/getByFilter', to: 'tool#get_by_filter'
      post 'tools/getByCode', to: 'tool#get_by_code'

      post 'auth/login', to: 'auth/auth#login'
      post 'auth/checkLogin', to: 'auth/auth#checkLogin'
      get 'auth/verify', to: 'auth/auth#verify'
      post 'auth/sign_up', to: 'auth/auth#sign_up'
      delete 'auth/logout', to: 'auth/auth#logout'
      #post 'daily_production_reports/:production_id/report/:report_id/validation', to: 'daily_production_reports#validate_production'
    
      resources :checklist do
        collection do
          post 'getChecklistShift'
          post 'create'
          post 'save'
          post 'saveLog'
        end
      end

      get 'checklists/:id', to: 'checklist#show'

      get 'shifts', to: 'shift_service#show'

      get 'datatables/:id', to: 'datatable#show'

      get 'workorders/getLastsByTool/:tool_id', to: 'work_order#get_lasts_by_tool'

      resources :work_order do
        post 'pr_calculate'
      end

      resources :issue do
        collection do
          get 'getAllIssues'
          post 'getIssuesByOutType'
          post 'getIssuesByIssueType'
        end
      end

      resources :shift do
        collection do
          post 'comment'
          post 'updateLog'
          post 'deleteLog'
        end
      end

      resources :report do
        collection do
          post 'getLog'
          post 'getLogDetail'
          post 'assignFailure'
          post 'manualAssist'
          post 'manualEscalation'
          post 'escalationLog'
          post 'mergeDowntimes'
          post 'splitDowntimes'
          post 'getReport'
          post 'getOm'
          post 'unmerge'
          post 'manualTracking'
          post 'getHistoric'
          post 'getWorkOrdersMaximo'
          post 'createWorkOrderMaximo'
          post 'updateWorkOrderMaximo'
          post 'existsWorkOrderMaximo'
          post 'getToolCurrentDT'
        end
      end

      resources :inspections
      get 'inspections/:tool_id/actual', to: 'inspections#get_actual_trend'
      get 'inspections/:check_list_id/approval', to: 'inspections#get_inspection_check_list_approvals'
      get 'inspections/:tool_id/report', to: 'inspections#get_inspection_report'
      get 'inspections/report/:work_order_id', to: 'inspections#get_inspection_report_by_work_order'

      resources :inspection_check_lists
      resources :instruments
      resources :julian_numbers, only: :show

      post 'hourproduction/getInfoShift', to: 'production_control_boards#getInfoShift'
      get 'hourproduction/getReportsOfTheDay', to: 'production_control_boards#getReportsOfTheDay'
      get 'hourproduction/getWeekProduction', to: 'production_control_boards#getWeekProduction'
      get 'hourproduction/getLastRecordProduction', to: 'production_control_boards#getLastRecordProduction'
      post 'user/profile', to: 'users#profile'

      # Admin endpoints

      namespace :admin do
        resources :tools
        resources :users
        resources :escalation_rules
        resources :user_has_issue_types
        resources :assets
      end
    
      post 'easyredmine', to: 'easy_red_mine#setComment'

      get 'versionapp', to: 'version_app#check' 
    end

  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
