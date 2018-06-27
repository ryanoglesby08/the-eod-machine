FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

ENTRYPOINT ["yarn"]
CMD ["start"]
