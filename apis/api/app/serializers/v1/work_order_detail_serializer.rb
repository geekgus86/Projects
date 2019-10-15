class V1::WorkOrderDetailSerializer < ActiveModel::Serializer
  attributes 'ID', 'RealSpeed', 'OpenMinutes','ReportNumber', 'ReportGroup', 'SetupManual', 'EscalationManual', 'UserID', 'ShiftID', 'OrganizationID', 'StartAt'
  belongs_to :report_status
  belongs_to :issue
end