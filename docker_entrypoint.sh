#!/bin/bash

set -e

# Start cron for email scheduling
/etc/init.d/cron start

# Start main web app
exec bin/rails server

exec "$@"
