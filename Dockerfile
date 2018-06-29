# User must set the following environment variables when running the container
#   SECRET_KEY_BASE   The encrypted cookie secret for Rails
#   SMTP_ADDRESS      Remote mail server
#   SMTP_PORT         Remote mail sever port
#   SMTP_DOMAIN       Mail domain
#   SMTP_USERNAME     Mail server authentication
#   SMTP_PASSWORD     Mail server authentication

FROM ruby:2.5

RUN apt-get update && apt-get -y install cron curl

# Install supercronic so that the email scheduler can run as a non-root user. https://github.com/aptible/supercronic
ENV SUPERCRONIC_URL=https://github.com/aptible/supercronic/releases/download/v0.1.5/supercronic-linux-amd64 \
    SUPERCRONIC=supercronic-linux-amd64 \
    SUPERCRONIC_SHA1SUM=9aeb41e00cc7b71d30d33c57a2333f2c2581a201

RUN curl -fsSLO "$SUPERCRONIC_URL" \
 && echo "${SUPERCRONIC_SHA1SUM}  ${SUPERCRONIC}" | sha1sum -c - \
 && chmod +x "$SUPERCRONIC" \
 && mv "$SUPERCRONIC" "/usr/local/bin/${SUPERCRONIC}" \
 && ln -s "/usr/local/bin/${SUPERCRONIC}" /usr/local/bin/supercronic


# Create the home directory for the new app user
RUN mkdir -p /home/eodmachine

# Create an app user so EOD machine doesn't run as root
RUN groupadd -r eodmachine &&\
    useradd -r -g eodmachine -d /home/eodmachine -s /sbin/nologin -c "Docker image user" eodmachine

# Set the home directory app user's home
ENV HOME=/home/eodmachine
ENV APP_HOME=/home/eodmachine/src

WORKDIR $APP_HOME

# Throw errors if Gemfile is modified
RUN bundle config --global frozen 1

COPY Gemfile Gemfile.lock ./
RUN bundle install --with docker --without development test

COPY . .

RUN chown -R eodmachine:eodmachine $APP_HOME

USER eodmachine

ENV RAILS_ENV=production RAILS_SERVE_STATIC_FILES=true RAILS_LOG_TO_STDOUT=true \
    SMTP_AUTHENTICATION=login SMTP_ENABLE_STARTTLS_AUTO=true \
    SECRET_KEY_BASE=overrideme

RUN bin/rails db:migrate assets:precompile

ENTRYPOINT ["./docker_entrypoint.sh"]
