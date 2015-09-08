== README


To set up the environment:
---------------------------
<pre>
bundle install --path=vendor/bundle                             # Installs all the gem dependencies<br/>
RAILS_ENV=production bundle exec rake db:create db:migrate      # Creates the database
</pre>


To start the server:
-------------------------
<pre>
SECRET_KEY_BASE=&lt;secret_key&gt; RAILS_ENV=production bundle exec rails server           # Starts the server
</pre>


To start the cron jobs:
-------------------------
<pre>
# Jobs are defined in config/schedule.rb

crontab -l                  # Lists the current cron jobs
bundle exec whenever        # Lists the new cron jobs for the eod machine app
bundle exec whenever -w     # Adds new cron jobs to crontab
crontab -l                  # Should see the new cron jobs there
</pre>

To test email:
------------------------
<pre>
bundle exec rake deliver_eod[&lt;team_name&gt;]
</pre>



TODO
- Deploy to Rackspace
- Inject SMTP user/pass
- Use BC SMTP instead of gmail
- Show error for author if left empty on submit
- Preserve content if submit fails
- Use the scheduled jobs
- Allow multiple content entries for each category in a single submit
