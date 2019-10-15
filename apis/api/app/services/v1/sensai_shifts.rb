require 'time'

class V1::SensaiShifts

  def self.get_shifts(only_schema, start_date = nil)
    localTimezone = 'America/Monterrey'
    schema_name = only_schema #Prodtrack.table_name.split(".")[0]

    #FIXME corregir con los catalogos
    if ["et_k14", "et_k15", "et_k3", "et_k4", "et_k1", "et_k2", "et_k9", "et_k5", "et_k6", "et_k7", "et_k8"].include?(schema_name)
        #Etown
        localTimezone = 'America/New_York'
         shifts = [
            { id: 1, Description: "#{I18n.t(:shift)} 3", startAt: "22:30:00", duration: 28799 },
            { id: 2, Description: "#{I18n.t(:shift)} 1", startAt: "06:30:00", duration: 28799 },
            { id: 3, Description: "#{I18n.t(:shift)} 2", startAt: "14:30:00", duration: 28799 }            
         ]
    elsif ["apo_schulerA", "apo_schulerB","apo_fagorA", "apo_fagorB", "apo_k1200", "apo_jinan" , "schulerA", "schulerB","fagorA", "fagorB", "k1200", "jinan"].include?(schema_name)
        #Monterrey
        localTimezone = 'America/Monterrey'
        shifts = [
            {id: 1, startAt: "06:00:00", Description: "#{I18n.t(:shift)} 1", duration: 43199},
            {id: 2, startAt: "18:00:00", Description: "#{I18n.t(:shift)} 2", duration: 43199}
        ]
    end

    #Step 1 - Receive and convert the date in local timezone --> start_date = "2018-11-30 06:00:00"
    start_date = start_date || Time.now.in_time_zone(localTimezone)
    #start_date = "2019-01-30 23:29:00"
    original_date = start_date
 
    if start_date.is_a? Symbol
      start_date = start_date.to_s
      original_date = original_date.to_s
    end

    #if start_date.is_a? String
    start_date = start_date.in_time_zone(localTimezone)
    original_date = original_date.in_time_zone(localTimezone)
    #end

    #Step 2 - If firth ship > lastshift we are talkign about a day prev.
    firstShift = shifts.first
    lastShift = shifts.last
    if firstShift[:startAt] > lastShift[:startAt] and firstShift[:startAt] > start_date.strftime('%H:%M:%S')
        start_date = start_date-1.days
    elsif firstShift[:startAt] < lastShift[:startAt] and firstShift[:startAt] > start_date.strftime('%H:%M:%S')
        start_date = start_date-1.days
    end

    # Step 3 - By the shiftRangeStart determine the shift range
    dataReturn = {}
    dataReturn["shifts"] = {}

    startAt = start_date
        
    shifts.each do |s|
        startAt = (startAt.strftime('%Y-%m-%d')+" "+s[:startAt]).in_time_zone(localTimezone)        
        endAt = startAt+s[:duration].seconds
        
        shift = { 
            Description: s[:Description],
            startAt: startAt,
            endAt: endAt,
            startAtUTC: startAt.utc,
            endAtUTC: endAt.utc,
            duration: s[:duration]
        }

        dataReturn["shifts"][s[:id]] = shift

        startAt = endAt
    end

    dataReturn["rangeShift"] = self.get_range_shift(dataReturn["shifts"])
    #dataReturn["original_date"] = original_date.in_time_zone(localTimezone)
    #dataReturn["start_date"] = start_date    
    dataReturn["actualShift"] = self.get_actual_shift(dataReturn["shifts"], original_date)   
    dataReturn["previousShift"] = self.get_previous_shift(dataReturn["actualShift"])
    dataReturn["timezone"] = localTimezone
    return dataReturn
  end

  def self.get_range_shift dataReturn

    firstkey, firstRecord = dataReturn.first
    lastkey, lastRecord = dataReturn.to_a.last

    return { 
        startAt: firstRecord[:startAt],
        endAt: lastRecord[:endAt],
        startAtUTC: firstRecord[:startAtUTC],
        endAtUTC: lastRecord[:endAtUTC],
    }

  end  

  def self.get_actual_shift dataReturn, start_date
    shift_actual_key = dataReturn.find { |key, data|
        start_date.between?(data[:startAt], data[:endAt])
    }.first

    return dataReturn[shift_actual_key]
  end
  
  def self.get_previous_shift actualShift
    endAt = actualShift[:endAt] - (actualShift[:duration].seconds+1)
    startAt = endAt - actualShift[:duration].seconds

    return { 
        startAt: startAt,
        endAt: endAt,
        startAtUTC: startAt,
        endAtUTC: startAt,
    }
  end

end
