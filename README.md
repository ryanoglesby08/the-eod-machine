# The EOD Machine

Easily share daily updates among distributed teams.

Deployment
-------------------------
Right now the deployment model uses git:

1. Check out the repo on whatever server you want to run The EOD Machine.
2. (Manual step) Provide configuration values. See "Configuration" section below.
3. Then just run `./deploy.sh`. This script will pull new code, set up the environment, and start the server using Rails.

Configuration
-------------------------
_The EOD Machine uses the [Config gem](https://github.com/railsconfig/config#common-config-file) to manage configuration._

Because The EOD Machine sends emails, it will need some configuration to know how to hook into your SMTP or sendmail service. See `config/settings.yml` and `config/settings/<environment>.yml` for the out-of-the-box configurations. If these work for you, you may just need to set some environment variables that point to your SMTP server and you will be good to go.

If you need to override something completely, you should provide a "local" settings file with your custom overrides. For example, if you need to override the `config/settings/production.yml` file, create a new file called `config/settings/production.local.yml`. This will not be tracked by git.

The EOD Machine supports SMTP or sendmail for sending emails. To switch to sendmail, override the 'mailer.delivery_method' setting to `:sendmail`.

Useful commands with the cron job scheduler
-------------------------
<pre>
# Jobs are defined in config/schedule.rb

crontab -l                  # Lists the current cron jobs
bundle exec whenever        # Lists the new cron jobs for the eod machine app
bundle exec whenever -w     # Adds new cron jobs to crontab
crontab -l                  # Should see the new cron jobs there
</pre>


TODO
-------------------------
- ~~Show error for author if left empty on submit~~
- ~~Preserve contents and author if submit fails~~
- Acceptance/functional UI Testing?
- ~~Allow multiple content entries for each category in a single submit~~
- ~~Better automation of deployment~~
- ~~Support multiple/customizable teams and locations~~
- ~~Support customizable categories per team~~
- ~~Show timeline of eod delivery times on create/edit team page~~
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
- Allow uploading images to the EOD update
- Preserve formatting of EOD entries (line breaks, etc)
- Rich text for EOD entries?
- ~~Responsive behavior for EOD time slider~~
