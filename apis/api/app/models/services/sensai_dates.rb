require 'time'
class Services::SensaiDates
  attr_accessor :turnos, :todayDate, :turnActual, :start_date1, :end_date1, :start_date2, :end_date2

  def initialize start_date
    @todayDate = start_date
    @start_date1, @start_date2 = nil, nil
    @end_date1, @end_date2 = nil, nil
  end

  def self.get_turns(start_date = nil)
    
    today_date = start_date || Time.now.utc
    if today_date.is_a? String
      today_date = Time.parse(today_date).utc
    end

    shift_start_date = today_date
    #dynamic timezone "Se necesita arreglar el inicio"
    @shiftStart = shift_start_date.in_time_zone('America/Monterrey').change(hour: 6, min:0, sec: 0).utc
    #puts 'Test', @shiftStart
    @shiftStart = @shiftStart.strftime('%H').to_i
    #puts 'testing', @shiftStart, @shiftStart-1
    today_date = today_date - 1.day if today_date.utc.hour.between?(0, @shiftStart-1)
    start_date1 = today_date.change({hour: @shiftStart, min: 0, sec: 0})

    end_date1 = start_date1 + 12.hours - 1.second

    start_date2 = start_date1 + 12.hours
    end_date2 = start_date2 + 12.hours - 1.second
    dataReturn = {
        turno1: {
            startAt: start_date1,
            startHour: start_date1.strftime('%H:%M:%S'),
            endAt: end_date1,
            endHour: end_date1.strftime('%H:%M:%S')
        },
        turno2: {
            startAt: start_date2,
            startHour: start_date2.strftime('%H:%M:%S'),
            endAt: end_date2,
            endHour: end_date2.strftime('%H:%M:%S')
        },
        range: {
            startAt: start_date1,
            startHour: start_date1.strftime('%H:%M:%S'),
            endAt: end_date2,
            endHour: end_date2.strftime('%H:%M:%S')
        }
    }
    dataReturn["turnActual"] = self.get_actual_turn(dataReturn, start_date)
    return dataReturn
  end

  def self.get_actual_turn dataReturn, start_date
    time_now = start_date || Time.now.utc
    turn_now = time_now.between?(dataReturn[:turno1][:startAt], dataReturn[:turno1][:endAt]) ? "turno1" : "turno2"
    turn_now
  end

  def self.import
    
    sql = []
    Tool.all.order(:ID).each do |t|
      sql << "insert into [SchulerB].[schulerB].[Tool] (DescTool, ParentCode, DesignSpeed, ObjectiveID, JobNumber) values ('#{t.DescTool}, #{t.ParentCode}, #{t.DesignSpeed}, #{t.ObjectiveID}, #{t.JobNumber}')"
    end

    Issue.all.order(:ID).each do |i|
      sql << "insert into [SchulerB].[schulerB].[Issue] (IssueTypeID, DescIssue, DTCode, COCode, SBU) "
    end

    return sql

  end

end