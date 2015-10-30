# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

require 'tasks/eod_delivery'

task :deliver_eod => :environment do
  EodDelivery.go(Time.now.utc)
end

task :test => %w(spec konacha:run)