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
SECRET_KEY_BASE=&lt;secret_key&gt; RAILS_ENV=production bundle exec rails server -b &lt;bind_to_ip_address&gt; -d
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
- Show error for author if left empty on submit
- Preserve contents and author if submit fails
- Allow multiple content entries for each category in a single submit
- Better automation of deployment
- Support multiple/customizable teams
- Support customizable categories
