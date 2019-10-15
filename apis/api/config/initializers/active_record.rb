ActiveRecord::Base.schema_migrations_table_name = "#{ENV['ASSET_SCHEMA'] || 'base'}_schema_migrations"
