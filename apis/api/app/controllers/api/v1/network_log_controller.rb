class Api::V1::NetworkLogController < ApplicationController

    def save_log 
        strinfo = params[:strinfo]
        splitInfo = strinfo.split("_")
        NetworkLog.execute_procedure('Admin.saveNetworkLog', type: splitInfo[0], internet: splitInfo[1], inithour: splitInfo[2], finalhour: splitInfo[3], ip: splitInfo[4], user: splitInfo[5])
        render json: { success: true}
    end

end  