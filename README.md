# The EOD Machine

To set up the environment:
---------------------------
<pre>
bundle install --path=vendor/bundle                             # Installs all the gem dependencies<br/>
RAILS_ENV=production bundle exec rake db:create db:migrate      # Creates the database
</pre>


To start the server:
-------------------------
<pre>
RAILS_ENV=production bundle exec rake assets:precompile
SECRET_KEY_BASE=&lt;secret_key&gt; RAILS_ENV=production RAILS_SERVE_STATIC_FILES=true bundle exec rails server -b &lt;bind_to_ip_address&gt; -d
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
- ~~Show error for author if left empty on submit~~
- ~~Preserve contents and author if submit fails~~
- Acceptance Testing
- ~~Allow multiple content entries for each category in a single submit~~
- ~~Better automation of deployment~~
- ~~Support multiple/customizable teams and locations~~
- ~~Support customizable categories per team~~
- Show time to next EOD delivery for the current team in the header
- Show timeline of eod deliveries on create team page
- ~~Use FactoryGirl~~
- ~~Better validation/input for EOD time~~
- Allow an arbitrary number of Team Locations
- ~~Don't install test dependencies with bundler for deployments~~
- ~~Don't allow a team to be created/edited with no categories~~
- ~~Fix error styling when invalid categories happens.~~
- ~~Fix validations for Category names to be scoped by team.~~
- ~~Move hardcoded config things to be injected/configured (like the FROM address for the mailer)~~
- Allow editing/removal of eod entries
- Add team name to email subject line
