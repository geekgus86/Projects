class WorkOrderDetail < ApplicationRecord
  self.table_name = "#{schema}WorkOrderDetail"

  attr_accessor :OpenMinutes, :exclude

  after_find :refresh_open_second, :set_open_minutes, :set_issue_group
  #after_update :recalculate_pr

  Issue_Downtime = [1, 2, 3, 4, 6, 7]

  belongs_to :work_order, foreign_key: 'WorkOrderID', optional: true
  belongs_to :issue, foreign_key: 'IssueID', optional: true
  belongs_to :escalation_type, foreign_key: 'EscalationTypeID'
  belongs_to :escalation_rule, foreign_key: 'EscalationRuleID'
  belongs_to :report_status, foreign_key: 'ReportStatusID'
  belongs_to :tool, foreign_key: 'ToolID', optional: true
  belongs_to :escalation_rule, foreign_key: 'EscalationRuleID'
  has_many :work_order_logs, foreign_key: 'WorkOrderDetailID'
  has_many :work_order_maximo, foreign_key: 'wod_id'

  has_one :work_order_detail_group, foreign_key: 'ParentID'
  has_many :work_order_detail_groups, foreign_key: 'WorkOrderDetailID'

  belongs_to  :group, class_name: 'WorkOrderDetailGroup', foreign_key: 'WorkOrderDetailGroupID', optional: true

  scope :between_date, ->(date1, date2) { where('WorkOrderDetail.StartAt >= ? AND WorkOrderDetail.EndAt <= ?', date1, date2) }
  scope :between_wo, ->(date1, date2) { where('(WorkOrderDetail.EndAt >= ? AND WorkOrderDetail.StartAt <= ? ) OR (WorkOrderDetail.StartAt >= ? AND WorkOrderDetail.StartAt <= ? AND WorkOrderDetail.EscalationTypeID = 2)', date1, date2, date1, date2) }
  scope :by_issue_id, ->(issue) { where(IssueID: issue) }
  scope :by_group_issue_id, -> (issue){ joins(:group).where(WorkOrderDetailGroup: {IssueID: issue}) }
  scope :by_escaletion, ->(escaletion) { where(EscalationTypeID: escaletion) }
  scope :by_report_status, ->(status_id) { where(ReportStatusID: status_id) }
  #scope :no_microdowntime, -> { where('WorkOrderDetail.OpenSecond >= 60') }
  scope :no_microdowntime, -> { where('WorkOrderDetail.OpenSecond >= 60 or (WorkOrderDetail.OpenSecond < 60 and WorkOrderDetail.IssueID is not null)') }
  scope :only_microdowntime, -> { where('WorkOrderDetail.OpenSecond < 60') }
  scope :only_out_time_g, -> { joins(:group => :issue).where(group: {issue: {IssueTypeID: 5}}) }
  scope :only_out_time, -> { joins(:issue).where(issue: { IssueTypeID: 5 }, WorkOrderDetailGroupID: nil) }
  scope :only_downtime, -> { joins(:issue).where(issue: { IssueTypeID: [1, 2, 3, 4, 6] }) }
  scope :get_last_co, -> (start_at, end_at, wo_id){ where("WorkOrderDetail.StartAt >= ? AND WorkOrderDetail.StartAt <= ? AND WorkOrderDetail.EscalationTypeID = 2 AND WorkOrderDetail.WorkOrderID <> ?", start_at, end_at, wo_id)}
  scope :by_asset, -> (asset_id){ where(:AssetID => asset_id) }
  scope :between_pr, ->(startDate, endDate){ where("(WorkOrderDetail.StartAt >= ? and WorkOrderDetail.StartAt <= ?) OR (WorkOrderDetail.EndAt >= ? and WorkOrderDetail.EndAt <= ?) OR (WorkOrderDetail.EndAt is null and WorkOrderDetail.StartAt < ?)", startDate, endDate, startDate, endDate, endDate)}
  scope :get_pr, ->(startDate, endDate, asset_id){ where('WorkOrderDetail.StartAt >= ? AND WorkOrderDetail.EndAt <= ? AND ReportStatusID = 19 AND AssetID = ?', startDate, endDate, asset_id) }
  scope :with_g, -> { where("WorkOrderDetail.WorkOrderDetailGroupID is not null")}
  scope :without_g, -> { where("WorkOrderDetail.WorkOrderDetailGroupID is null")}
  scope :without_not_reported_time, -> { joins(:issue).where("Issue.DTCode <> ? AND Issue.DTCode <> ?", 'O999', '999') }
  scope :only_top_5, -> { joins(:issue).where('Issue.ShowTop5 = 1') }

  def recalculate_pr
    issue_type = IssueType.joins(:issues).where(:issue => {:ID => [self.IssueID, self.IssueID_was]}, :ID => 5).count
    if issue_type.present?
      start_at = self.StartAt.strftime("%Y-%m-%dT%H:00:00")
      end_at = Time.now.in_time_zone("UTC").strftime("%Y-%m-%dT%H:59:59")
      calculate_pr(start_at, end_at, self.AssetID)
    end
  end
  
  def get_tnd(startDate, endDate, asset_id)
    details = WorkOrderDetail.by_asset(asset_id).between_pr(startDate, endDate)
    detail = details.only_out_time + details.only_out_time_g
    open_second = endDate - startDate
    open_second_out = 0
    detail.each do |d|
      if d.EndAt == nil
        open_second_out += (DateTime.now - d.StartAt)
      else
        open_second_out +=  (d.EndAt - d.StartAt)
      end
      # if d.EndAt > startDate || d.StartAt < endDate
      #   open_second_out = (endDate - d.EndAt)
      #   if (d.EndAt > endDate)
      #     open_second_out = (endDate - d.EndAt)
      #   else
      #     open_second_out = (d.EndAt - d.StartAt)
      #   end
      # end
    end
    tnd = open_second - open_second_out
    return tnd
  end

  def get_second_downtimes(startDate, endDate, asset_id)
    detail = WorkOrderDetail.by_asset(asset_id).only_downtime.between_pr(startDate, endDate)
    open_second = 0
    detail.each do |d|
      open_second += if d.EndAt == nil || d.StartAt < startDate || d.EndAt > endDate 
        tmp_start = d.StartAt < startDate ? startDate : d.StartAt
        tmp_end = (d.EndAt == nil || d.EndAt > endDate) ? endDate : d.EndAt
        tmp_end - tmp_start
      else
        d.OpenSecond
      end
    end
    return open_second
  end

  def calculate_pr(startDate, endDate, asset_id)
    prod = Prodtrack.execute_procedure('Admin.getHxh', startDate: startDate, endDate: endDate, timezone: 0, assetID: asset_id)
    prod.each do |p|
      wo_pr = WorkOrderDetail.get_pr(p["inicio"], p["fin"], asset_id)
      wo_pr.destroy_all if wo_pr.present? && prod.present?
      tnd = get_tnd(p["inicio"], p["fin"], asset_id)
      downtimes = get_second_downtimes(p["inicio"], p["fin"], asset_id)
      potentialStrokes = (p["DesignSpeed"] * (tnd/60))
      pr = ((potentialStrokes - p["piezas"]) / p["DesignSpeed"]) - (downtimes / 60)
      pr *= 60
      pr = pr.round(2)
      insert_pr(pr, p, asset_id)
    end
  end

  def insert_pr(pr, p, asset_id)
    report_status_id = pr >= 60 ? 2 : 1
    if pr > 0
      report_number = WorkOrderDetailCounter.next_numb(asset_id)
      wodData = {
                StartAt: (p["fin"] - (pr.to_i).seconds ),
                EndAt: p["fin"],
                OpenSecond: pr, 
                RealSpeed: p["currentSpm"],
                ToolID: p["tool_id"],
                AssetID: asset_id,
                EscalationTypeID: 1,
                EscalationRuleID: report_status_id,
                ReportStatusID: 19,
                WorkOrderID: WorkOrder.by_tool(p["tool_id"]).last.ID,
                ReportNumber: report_number
              }
      wo = WorkOrderDetail.new(wodData)
      wo.save
    end

  end
  #FIXME corregir TimeOut
  def is_out_time
    set_issue_group
    #(self.AssetID == 1 && issue.try(:IssueTypeID) == 5) || (self.AssetID == 2 && issue.try(:IssueTypeID) == 12)
    issue.try(:IssueTypeID) == 5
  end

  def set_issue_group
    self.IssueID = self.group.IssueID if self.WorkOrderDetailGroupID.present?
  end

  def is_downtime
    Issue_Downtime.include?(issue.try(:IssueTypeID))
  end

  def self.get_data(start_date = '2018-10-02 12:00:00', end_date = '2018-10-02 16:00:00')
    data_return = []

    WorkOrderDetail.includes({ issue: :issue_type }, :escalation_rule, :tool, work_order_logs: :report_status).by_asset(asset_id).between_date(start_date, end_date).no_microdowntime.each do |w|
      # WorkOrderLog.includes(:report_status, :work_order_detail => [:issue, :escalation_rule, :tool] ).where(:CreatedAt => start_date .. end_date).order('ID DESC').each do |w|
      logs = w.work_order_logs
      l = logs.select { |lo| lo.ReportStatusID == 10 }[0]
      type = logs[0].report_status
      type2 = logs.select { |lo| lo.ReportStatusID == 13 }

      # r = w.work_order_detail
      i = w.try(:issue)
      e = w.try(:escalation_rule)
      t = w.try(:tool)
      it = i.try(:issue_type)
      code = ''
      desc = ''
      issue_type = '--'
      if w.try(:issue)
        code = w.ReportStatusID == 1 ? i.DTCode : i.COCode

        issue_type = it.DescIssueType
        desc = "#{code} - #{i.DescIssue}"
      end
      order = !type2.nil? ? 1 : 2
      data = {
        id: w.ID,
        report: w.ID,
        type: type.DescStatus,
        createdAt: l.CreatedAt,
        data: l.Message,
        issue: i.try(:ID),
        escalationLevel: e.try(:LevelEscalation),
        closedAt: w.EndAt,
        open_minutes: (w.OpenSecond / 60).round(2),
        report_group: w.ReportGroup,
        report_division: w.ReportDivision,
        reportCreatedAt: w.StartAt,
        report_type: w.ReportStatusID,
        report_number: w.ReportNumber,
        tool_code: t.try(:DescTool),
        desc: desc,
        code: code,
        color: it.try(:color),
        name: it.try(:DescIssueType),
        i_order: order,
        issueType: issue_type,
        group_id: w.WorkOrderDetailGroupID
      }
      data_return << data
    end
    data_return
  end

  def self.nextReportNCO
    turns = Services::SensaiDates.get_turns
    actual = turns[turns['turnActual'].to_sym]
    WorkOrderDetail.by_asset(asset_id).between_date(actual[:startAt], actual[:endAt]).no_microdowntime.by_escaletion(2).length + 1
  end

  def refresh_open_second
    return if self.EndAt.blank?
    self.OpenSecond = set_opend_seconds if (self.OpenSecond != set_opend_seconds && self.OpenSecond > 0) && self.EndAt.present? && self.OpenSecond >= 60 && self.EscalationTypeID == 2
  end

  def set_opend_seconds
    self.EndAt.present? ? (self.EndAt - self.StartAt).seconds : 0
  end

  def set_open_minutes
    self.OpenMinutes = self.OpenSecond.present? && self.OpenSecond > 0 ? (self.OpenSecond / 60) : 0
  end

  def set_in_renge start_at = nil, end_at = nil
    start_at = self.work_order.StartAt unless start_at
    end_at = self.work_order.EndAt unless end_at
    if self.StartAt < start_at
      self.StartAt = start_at
    elsif self.EndAt > end_at
      self.EndAt = end_at
      self.exclude = true
    end
    #self.OpenSecond = (self.EndAt - self.StartAt).round if self.OpenSecond > 0
    self.OpenSecond = (self.EndAt - self.StartAt).ceil if self.OpenSecond > 0
  end

end
