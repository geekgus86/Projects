class Api::V1::TryOutController < ApplicationController
    # before_action :authenticate

    def startTryout
       valueIssueID = params[:valueIssueIDvalueIssueIDvalueIssueIDvalueIssueID]
      ::V1::EventBus::EventBusService.publish 'metalsa/tryout', {:status => true, :AssetID => asset_id, :time_zone => 'America/Monterrey',:issueID => valueIssueID,  :dbSchema => {:asset => only_schema} }
      render json: { success: true}
    end

    def closeTryout
      valueIssueID = params[:issueID]
      ::V1::EventBus::EventBusService.publish 'metalsa/tryout', {:status => false, :AssetID => asset_id, :time_zone => 'America/Monterrey',:issueID => valueIssueID,  :dbSchema => {:asset =>only_schema} }
      render json: { success: true}
    end


    def authorizationTryOut
      tadi = params[:Tadi]
      issueiD = params[:IssueID]
      active = params[:Active]
      internalCode = params[:InternalCode]


      issueTypeId=0
      statusO=false
      statusT=false
      escalationRulesId = Array.new
      arrayEscalationRulesId =Array.new
      
      resultOutType = OutType.by_InternalCode(internalCode) 
      resultOutType.each do |value|

        if value.EscalationRulesId !="N/A"
          escalationRulesId = value.EscalationRulesId 

          escalationRulesId.split(",").each do |valueER|
            arrayEscalationRulesId.push(valueER)
          end
        end

        if value.IssueTypeID !="ALL"
          issueTypeId = value.IssueTypeID #Area
        end

      end


      if active == true

        if internalCode == "TOUT" #TOUT = 'TRY OUT'
          statusO=false
          statusT=true
        end

        if internalCode == "NOUT" #NOUT= 'Out Sotenido'
          statusO=true
          statusT=false
        end
      end


      body = { tadi: tadi, issueTypeId: issueTypeId, escalationRules: arrayEscalationRulesId, asset:only_schema }

      Rails.logger.info "#{tadi} #{issueTypeId} #{arrayEscalationRulesId} #{only_schema}"
      headers = { }     

      if internalCode == "TOUT" #NOUT= 'Out Sotenido'
        #response = ::V1::Http::HttpService.request 'post', 'https://api-admin.azurewebsites.net', '/api/team/validateTadiInArea/', headers, body
        response = ::V1::Http::HttpService.request 'post', 'http://i40appgateway.eastus.cloudapp.azure.com', '/admin/api/team/validateTadiInArea/', headers, body
      end

      if internalCode == "NOUT" #TOUT = 'TRY OUT'
        #response = ::V1::Http::HttpService.request 'post', 'https://api-admin.azurewebsites.net', '/api/team/validateTadiAllIssueType/', headers, body
        response = ::V1::Http::HttpService.request 'post', 'http://i40appgateway.eastus.cloudapp.azure.com', '/admin/api/team/validateTadiAllIssueType/', headers, body
      end

      valid = JSON.parse(response.body)['valid']
      message = JSON.parse(response.body)['message']
      numError = JSON.parse(response.body)['codeError']

      # puts "parametros ++++++++++"
      # puts "statusO"
      # puts statusO
      # puts "statusT"
      # puts statusT
      # puts "tadi" 
      # puts tadi 
      # puts "issueiD" 
      # puts issueiD 
      # puts "active" 
      # puts active 
      # puts "internalCode" 
      # puts internalCode 
      # puts "body" 
      # puts body 
      # puts "parametros ++++++++++"

      # puts "response"
      # puts response.body
      # puts "response"
      if valid
          f = WorkOrderDetail.last
          data1 = f.attributes
          data1[:AssetID] = asset_id
          data1[:dbSchema] = {:DB => get_database, :schema => schema, :asset => only_schema}
          ::V1::EventBus::EventBusService.publish 'metalsa/tryout', {:statusO => statusO,:statusT => statusT, :AssetID => asset_id, :time_zone => 'America/Monterrey',:issueID => issueiD,  :dbSchema => {:asset =>only_schema} }
          ::V1::EventBus::EventBusService.publish 'metalsa/failureIdentified', data1
          ::V1::EventBus::EventBusService.publish "metalsa/hxhCreated#{MQTT_ENV}", data1
          render json: { "success": true, :data => { nombre: message,resultActive: true,numError: numError} }
      else
          data = ''
          render json: { "success": false, :data => { data: data,resultActive: false,nombre:"",numError: numError } }
      end

    end


  end
  
