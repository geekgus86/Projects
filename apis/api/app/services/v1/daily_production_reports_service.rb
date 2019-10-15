class V1::DailyProductionReportsService
  def self.validate_report(report_validation_params, schema = "apo_schulerA", asset_id = 1)
    production_id = report_validation_params[:production_id]
    report_id = report_validation_params[:report_id]
    setup_status = report_validation_params[:setup_status]
    first_step production_id, report_id, setup_status, schema, asset_id
  end

  def self.first_step(production_id, report_id, setup_status, schema = "apo_schulerA", asset_id = 1)
    if setup_status
      result = scale_report production_id, schema, asset_id
      result['WorkOrderDetail'] = WorkOrderDetail.find result['WorkOrderDetailID']
      result
    else
      close_change_over report_id, production_id, schema, asset_id
    end
  end

  def self.scale_report(production_id, schema = "apo_schulerA", asset_id = 1)
	
    @daily_work_order = DailyWorkOrder.find production_id
    start_date = Time.now

	@work_order_detail = WorkOrderDetail.new({
		UserID: Auth::Current.user['id'],
		escalation_type: EscalationType.find(2),
		report_status: ReportStatus.find(2),
        SetupManual: true,
        ToolID: @daily_work_order.ToolID,
		work_order: WorkOrder.by_asset(asset_id).last(),
		escalation_rule: EscalationRule.find(6),
        StartAt: start_date,
        CreatedAt: start_date,
        AssetID: asset_id
	})
    success = @work_order_detail.save
	throw StandardError unless success


    @work_order_log = WorkOrderLog.new({
		WorkOrderDetailID: @work_order_detail['ID'],	
		ReportStatusID: 2,
		EscalationRuleID: 6,
		UserID: Auth::Current.user['id'],
        CreatedAt: start_date,
        AssetID: asset_id
	})
    success = @work_order_log.save
	throw StandardError unless success


    V1::EscalationTypeService.start_tracking @work_order_detail['ID'], schema, asset_id

    @daily_work_order.work_order_detail = @work_order_detail    
    success = @daily_work_order.update_columns(
      :DailyStatusID => 2, :WorkOrderDetailID => @work_order_detail['ID']
	)	
    throw StandardError unless success
		
	@daily_work_order.as_json
  end

  def self.close_change_over(report_id, production_id, schema, asset_id)
    V1::EscalationTypeService.stop_tracking report_id, schema, asset_id
    
	@work_order_detail = WorkOrderDetail.find report_id
	
	end_time = Time.now
	
    @work_order_detail.OpenSecond = ((end_time - @work_order_detail.StartAt) / 1.second).round
	@work_order_detail.EndAt = end_time
	@work_order_detail.ReportStatusID = 10
	
	success = @work_order_detail.save
	throw StandardError unless success

	@work_order_log = WorkOrderLog.new({
		WorkOrderDetailID: @work_order_detail['ID'],	
		ReportStatusID: 10,
		UserID: nil, #Auth::Current.user['id'],
    CreatedAt: end_time,
    AssetID: asset_id
	})
	
    success = @work_order_log.save	
	throw StandardError unless success

    @daily_work_order = DailyWorkOrder.find production_id	
    success = @daily_work_order.update_columns(
        :DailyStatusID => 3
    )	

    #lastWorkOrder = WorkOrder.last()
    #data = DailyWorkOrder.create(:DailyStatusID => 1, :WorkOrderID => lastWorkOrder.ID)
    
	throw StandardError unless success
  end
end