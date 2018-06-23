# User must set the following environment variables when running the container
#   SECRET_KEY_BASE   The encrypted cookie secret for Rails
#   SMTP_ADDRESS      Remote mail server
#   SMTP_PORT         Remote mail sever port
#   SMTP_DOMAIN       Mail domain
#   SMTP_USERNAME     Mail server authentication
#   SMTP_PASSWORD     Mail server authentication

FROM ruby:2.5

RUN apt-get update && apt-get -y install cron

# Throw errors if Gemfile is modified
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install --with docker --without development test

COPY . .

ENV RAILS_ENV=production RAILS_SERVE_STATIC_FILES=true \
    SMTP_AUTHENTICATION=login SMTP_ENABLE_STARTTLS_AUTO=true \
    SECRET_KEY_BASE=overrideme

RUN bin/rails db:migrate assets:precompile

# Set up the cron job for emails
RUN whenever --write-crontab

ENTRYPOINT ["./docker_entrypoint.sh"]
