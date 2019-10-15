class Api::V1::ShiftController < ApplicationController

    before_action :authenticate 

    def comment 
        userId = Auth::Current.user['id']
        username = Auth::Current.user['name']
        Rails.logger.info("USer: #{Auth::Current.user}")
        comment = params[:comment]
        begin
            data = { CreatedBy: userId, Message: comment, ReportStatusID:13, UserID: userId, 
                AssetID: asset_id, CreatedAt:  DateTime.now.strftime('%Y%m%dT%H%M%S%z'), username: username}
        rescue => ex
            data = { CreatedBy: userId, Message: comment, ReportStatusID:13, UserID: userId, 
                AssetID: asset_id, CreatedAt:  DateTime.now.strftime('%Y%m%dT%H%M%S%z')}
        end
        data = WorkOrderLog.create(data)
        #puts data.errors.full_messages
        render json: { success: true, data: data }
    end

    def updateLog
        log_id = params[:log_id]
        comment = params[:comment]
        w = WorkOrderLog.find_by_ID(log_id)
        w.update_columns(:Message => comment)
        render json: { success: true, data: w }
    end

    def deleteLog
        log_id = params[:log_id]
        w = WorkOrderLog.find_by_ID(log_id)
        w.destroy
        render json: { success: true, data: [] }
    end

end
