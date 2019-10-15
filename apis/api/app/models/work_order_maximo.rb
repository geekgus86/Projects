class WorkOrderMaximo < ApplicationRecord
    self.table_name = "#{schema}WorkOrderMaximo"
    
    belongs_to :work_order_detail, foreign_key: 'wod_id', optional: true
    belongs_to :asset, foreign_key: 'asset_id', optional: true

    scope :between_date, ->(date1, date2) { where('WorkOrderMaximo.wod_start_at >= ? AND (WorkOrderMaximo.wod_start_at <= ?) ', date1, date2) }
#    scope :are_valids, -> (status) { where('WorkOrderMaximo.status IN (?)', status) }
    scope :are_valids, ->(status) { where(:status => status) }
    
    def self.get_data(start_date = '2018-10-02 12:00:00', end_date = '2019-10-02 16:00:00', asset_id)
        data_return = []
        wom = WorkOrderMaximo.includes( :work_order_detail ).between_date(start_date, end_date).are_valids(['ABIERTA','PROCESADA']).where({asset_id: asset_id}).where.not(wo_num: nil).order('wo_created_at DESC')
        wom.each do |w|
            wod = w.try(:work_order_detail)
            i = wod.try(:issue)
            it = i.try(:issue_type)
            next unless [3,4].include?(it.try(:id)) 
#            next if wod.WorkOrderDetailGroupID.present?
            order_id = w.wo_num
            creation_date = w.wo_created_at
            creation_type = w.creation_type
            if wod.try(:issue)
              if w.dt_type.to_i == 1
                code = i.DTCode
              else
                code = i.COCode
              end
              issue_type = it.DescIssueType
            end
            dt_number = "#{wod.ReportNumber} #{wod.ReportDivision}"
            data = {
                orderId: order_id,
                createdAt: creation_date,
                creationType: creation_type,
                dtIssueTypeId: i.id,
                code: code,
                issueType: issue_type,
                dtNumber: dt_number,
                dtType: w.dt_type,
                color: it.Color
            }
            data_return << data
        end
        data_return
    end
end