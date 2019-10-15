class WorkOrderLog < ApplicationRecord
  self.table_name = "#{schema}WorkOrderLog"

  belongs_to :report_status, foreign_key: 'ReportStatusID', optional: true
  belongs_to :work_order_detail, foreign_key: 'WorkOrderDetailID', optional: true
  belongs_to :issue, foreign_key: 'IssueID', optional: true
  belongs_to :user, foreign_key: 'UserID', optional: true

  scope :no_microdowntime, -> { where('OpenSecond >= 60') }
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
  has_many :work_order_logs, foreign_key: 'WorkOrderDetailID'

  def self.get_data(start_date = '2018-10-02 12:00:00', end_date = '2018-10-02 16:00:00', asset_id)
    data_return = []
    WorkOrderLog.includes(:report_status, work_order_detail: [:issue, :escalation_rule, :tool]).where(CreatedAt: start_date..end_date, ReportStatusID: 13, AssetID: asset_id).order('CreatedAt DESC').each do |w|
      type = w.report_status
      user = w.try(:user)      
      username = '--'
      if w.try(:username)
        username = w.username
      else
        user = w.try(:user)
        username = user.try(:name)
      end

      data = { id: w.ID, type: type.DescStatus, createdAt: w.CreatedAt, data: w.Message, 
        report_statusID: w.ReportStatusID, i_order: 1, nombre: username }
      data_return << data
    end

    work_order_detail = WorkOrderDetail.includes(:issue, :escalation_rule, :tool, :report_status, :group).
    left_outer_joins(:work_order_maximo).by_asset(asset_id).between_wo(start_date, end_date).
    select("WorkOrderDetail.*, WorkOrderMaximo.wod_id, WorkOrderMaximo.wo_num, WorkOrderMaximo.message, WorkOrderMaximo.workorder_id").
    no_microdowntime.order('EndAt DESC')

    work_order_detail.each do |w|
      open_minutes = 0
      next if w.group.present? && w.group[:ParentID] != w.ID

      w.set_in_renge w.StartAt, w.EndAt if w.EscalationTypeID == 2
      type = w.report_status
      i = w.try(:issue)
      e = w.try(:escalation_rule)
      t = w.try(:tool)
      it = i.try(:issue_type)
      code = ''
      desc = ''
      issue_type = '--'
      if w.try(:issue)
        if w.EscalationTypeID == 1
          code = i.DTCode
        else
          code = i.COCode
        end
        issue_type = it.DescIssueType
        desc = code + ' - ' + i.DescIssue
      end

      if w.try(:OpenSecond)
        open_minutes = if w.group.present? && w.group[:ParentID] == w.ID then ((w.group[:GroupSeconds]*1.0) / 60).round(2) else (w.OpenSecond / 60).round(2) end
      end

      if open_minutes > 0
          data = { 
            id: w.ID, 
            report: w.ID, 
            type: type.DescStatus, 
            createdAt: w.StartAt, 
            issue: i.try(:ID), 
            escalationLevel: e.try(:LevelEscalation), 
            closedAt: w.try(:EndAt),
            open_minutes: open_minutes, 
            report_statusID: w.ReportStatusID,
            report_group: w.try(:ReportGroup), 
            report_division: w.try(:ReportDivision), 
            reportCreatedAt: w.try(:StartAt), 
            report_type: w.try(:EscalationTypeID), 
            report_number: w.ReportNumber, 
            tool_code: t.try(:DescTool), 
            desc: desc, 
            code: code, 
            color: it.try(:Color), 
            name: it.try(:DescIssueType), 
            issueType: issue_type,
            group_id: w.WorkOrderDetailGroupID,
            area: it.try(:ID),
            wo_maximo: w.try(:wo_num),
            wo_maximoMsg: w.try(:message),
            wo_maximo_id: w.try(:workorder_id),
            try_out: (w.IsTryOut || w.IsOut),
            is_out: w.IsOut,
            is_try_out1: w.IsTryOut
          } 
          data_return << data
      end
    end
    data_return
  end
end
