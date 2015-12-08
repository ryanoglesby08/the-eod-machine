# The EOD Machine

Deployment
==========================
Right now the deployment model is based on git. Check out the code on whatever server you want to run The EOD Machine on.
Then just run `./deploy.sh`. This script will pull new code, set up the environment, and start the server using Rails.

Useful commands with the cron job scheduler:
-------------------------
<pre>
# Jobs are defined in config/schedule.rb

crontab -l                  # Lists the current cron jobs
bundle exec whenever        # Lists the new cron jobs for the eod machine app
bundle exec whenever -w     # Adds new cron jobs to crontab
crontab -l                  # Should see the new cron jobs there
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
- ~~Add team name to email subject line~~
