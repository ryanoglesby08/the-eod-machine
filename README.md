# The EOD Machine

The EOD Machine makes is easy to share daily updates with remote or distributed team members. It is optimized for multi-site teams that have two co-located groups at separate locations, such as a team split between USA and India.

Each team member uses the EOD Machine web app on their own time to input information that they wish to share with the rest of the team. At pre-configured delivery times for each location, the EOD Machine will collate all entries and send an email to the team automatically.

Other options include [Status Hero](https://statushero.com/) or [Standuply](https://standuply.com/), but they are costly and proprietary. The EOD Machine will always be open source and free. :joy:

## Getting started

The EOD Machine is a web application with an email scheduler, distributed as a Docker image. You must provide a dedicated server on which to run it and an SMTP server to send the emails.

### Pre-requisites:

- [Docker](https://docs.docker.com/)
- SMTP server. [Gmail is an easy and free option](https://support.google.com/a/answer/176600?hl=en)

### Deployment

The EOD Machine application is composed of [3 docker images](https://hub.docker.com/r/ryanoglesby08/eod-machine/): a UI app server, an API, and a single-run emailer.

The easiest way of running everything is through the public `docker-compose` file, [available on Github](https://github.com/ryanoglesby08/the-eod-machine/blob/master/docker-compose.public.yml).

```bash
# Start mongo
docker-compose --file docker-compose.public.yml up --detach db

# Start the API on port 4000 and the UI on port 80
docker-compose --file docker-compose.public.yml up --detach ui api
```

The emailer is a single-run task, and should be run on a schedule using something like `cron`. Every 30 minutes is recommended.

```bash
0,30 * * * * /bin/bash -l -c docker-compose --file docker-compose.public.yml run \
  --env SMTP_HOST=<A SMTP server. e.g. smtp.gmail.com> \
  --env SMTP_PORT=<SMTP server port. e.g. 465> \
  --env SMTP_USERNAME='<SMTP username e.g. your-gmail@gmail.com>' \
  --env SMTP_PASSWORD='<SMTP password>' \
  emailer
```

## Local development

See the README.md file in each project directory (`api`, `ui`, and `emailer`) for getting started instructions.

Alternatively, you can run everything locally with `docker-compose`.

```bash
# Start the database first
docker-compose up --detach db

# Start the API and UI. Then open your browser to http://localhost:3000
docker-compose up --detach api ui

# Run the emailer as a one-off command
docker-compose run emailer

# Stop all services
docker-compose down
```
