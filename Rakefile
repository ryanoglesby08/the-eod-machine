# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

task :deliver_eod, [:from_team] => :environment do |_task, args|
  from_team = TEAMS[args[:from_team].to_sym]
  categories = Category.with_undelivered_entries

  unless categories.empty?
    EodMailer.eod_updates(from_team, categories).deliver_now
    Entry.where(delivered: false).update_all(delivered: true)
  end
end