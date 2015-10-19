#!/usr/bin/env bash

set -e

if [ -z "$ENV" ]; then
  echo "Defaulting to production environment."
  export ENV=production
fi

if [ -z "$SECRET_KEY" ]; then
  echo "ERROR: You must set a SECRET_KEY."
  exit 1
fi

if [ -z "$BIND_IP" ]; then
  echo "ERROR: You must set a BIND_IP."
  exit 1
fi

echo "Killing previous server..."
kill $(cat tmp/pids/server.pid)

echo "Getting new code..."
git pull

echo "Installing gem dependencies..."
bundle install --path=vendor/bundle --without test development
bundle clean

echo "Migrating the DB..."
RAILS_ENV=$ENV bundle exec rake db:migrate

echo "Writing the schedule..."
bundle exec whenever -w

echo "Precompiling assets..."
RAILS_ENV=$ENV bundle exec rake assets:clean assets:precompile

echo "Starting the server..."
SECRET_KEY_BASE=$SECRET_KEY RAILS_ENV=$ENV RAILS_SERVE_STATIC_FILES=true bundle exec rails server -b $BIND_IP -d

echo "Done!"