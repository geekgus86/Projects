class V1::WorkOrderLogService

  def self.track_change_over(report_id)
    WorkOrderLog.create({
      work_order_detail: WorkOrderDetail.find(report_id),
      report_status: ReportStatus.find(10),
      UserID: 1
    })
  end

end
