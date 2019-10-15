require 'fileutils'
namespace :admin do
  desc "Creates a new migration destined for the admin schema"
  task create_migration: :environment do
    _, migration = ARGV
    migration_output = `rails g migration #{migration}`
    original_route = migration_output.split.last
    file_name = original_route.split('/').last
    FileUtils.mv "#{Rails.root}/#{original_route}", "#{Rails.root}/db/migrate/admin/#{file_name}"
    exit
  end

  task migrate: :environment do
    ActiveRecord::Migrator.migrate("#{Rails.root}/db/migrate/admin")
  end

end
