#ActiveRecord::Base.table_name_prefix = 'schulerA.'
#ActiveRecord::ConnectionAdapters::SQLServerAdapter.lowercase_schema_reflection = true
#module ActiveRecord
#  module ConnectionAdapters
#    class SQLServerAdapter < AbstractAdapter
#
#      def configure_connection
#        raw_connection_do "SET TEXTSIZE #{64.megabytes}"
#      end

#      def configure_application_name
#        "myapp_#{$$}_#{Thread.current.object_id}".to(29)
#      end

#    end
#  end
#end