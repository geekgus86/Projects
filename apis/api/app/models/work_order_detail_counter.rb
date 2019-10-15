class WorkOrderDetailCounter < ApplicationRecord
  self.table_name = "admin.WorkOrderDetailCounter"

  def self.next_numb(asset_id)
  	wo = WorkOrderDetailCounter.find_by_OrganizationSchemaID(asset_id)
  	wo.Counter += 1
  	wo.save
  	return wo.Counter
  end

end