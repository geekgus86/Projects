class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  #set_schema_name = "schulerA."
  #ActiveRecord::Base.table_name_prefix = 'dbo.'
  #after_find :set_timezone
  before_create :set_timezoncreate

  def self.set_timezone time_zone
    #FIXME falta definir catalogos
    #zones = {'apo_schulerA': 'America/Monterrey', 'apo_schulerB': 'America/Monterrey', 'et_k14': 'America/New_York', 'et_k15': 'America/New_York'}
    Time.zone = time_zone#zones[zone_t.to_sym] 
  end

  def set_timezoncreate
    Time.zone = 'UTC'
  end

  def self.setSchem schemaNa
    models = Dir["#{Rails.root}/app/models/**/*.rb"].each do |m|
      name_m = m.chomp('.rb').camelize.split("::").last
      next if ["SensaiDates", "DailyProductionReport", "Shift", "Role", "ShiftType", "User", "Group", "LengthType", "AdminTeam", "Locale"].include?(name_m)
      eval("#{name_m}.table_name = '#{schemaNa}#{name_m}'")
    end
  end

  def self.get_database
    ActiveRecord::Base.connection.current_database
  end

  def self.actual_schema
    Tool.table_name.split(".")[0]
  end

  def self.schema
    "machine."
  end

end
