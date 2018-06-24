# The EOD Machine

The EOD Machine makes is easy to share daily updates with remote or distributed team members. It is optimized for multi-site teams that have two co-located groups at separate locations, such as a team split between Chicago, USA and Pune, India.

Each team member uses the EOD Machine web app on their own time to input information that they wish to share with the rest of the team. At pre-configured delivery times for each location, the EOD Machine will collate all entries and send an email to the team automatically.

Other options include [Status Hero](https://statushero.com/) or [Standuply](https://standuply.com/), but they are costly and proprietary. The EOD Machine will always be open source and free. :joy:

## Getting started

The EOD Machine is a web application with an email scheduler, distributed as a Docker image. You must provide a dedicated server on which to run it and an SMTP server to send the emails.

### Pre-requisites:

* [Docker](https://docs.docker.com/)
* SMTP server. [Gmail is an easy and free option](https://support.google.com/a/answer/176600?hl=en)

### Deployment

Pull [the Docker image](https://hub.docker.com/r/ryanoglesby08/eod-machine/), configure it with your SMTP server settings, and run it!

```sh
docker run \
  --env SECRET_KEY_BASE=<A token that the web app will use to encrypt its session information> \
  --env SMTP_ADDRESS=<An SMTP server. e.g. smtp.gmail.com> \
  --env SMTP_PORT=<SMTP server port. e.g. 587> \
  --env SMTP_DOMAIN=<A domain to use when sending the emails. e.g. mycompany.com> \
  --env SMTP_USERNAME=<SMTP username> \
  --env SMTP_PASSWORD=<SMTP password> \
  --publish <Port to publish the app to. e.g. 80>:3000 \
  ryanoglesby08/eod-machine
```
