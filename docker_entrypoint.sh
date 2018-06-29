#!/bin/bash

set -e

# Start supercronic for email scheduling
supercronic ./crontab &

# Start main web app
exec bin/rails server
