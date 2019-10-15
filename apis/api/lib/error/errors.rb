module Error
  class ReportInvalidError < SensaiError
    def initialize
      super :report_invalid_error, 510, 'Invalid Report'
    end
  end

  class EscalationLevelInvalidError < SensaiError
    def initialize
      super :escalation_level_invalid_error, 511, 'The escalation level does not exist'
    end
  end
end
