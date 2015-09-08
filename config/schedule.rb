# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

# EOD for Wilmington: 8:00 PM EST == 5:30 AM EST the next day
every :day, at: '12:00 am' do       # Assuming GMT
  rake 'deliver_eod[cs_wilmington]'
end

# EOD for Pune: 8:00 AM EST == 5:30 PM IST the same day
every :day, at: '12:00 pm' do       # Assuming GMT
  rake 'deliver_eod[cs_pune]'
end

#
# For testing: ryan uses my TW email address though
#
# every :day, at: '1:00 pm' do
#   rake 'deliver_eod[ryan]'
# end