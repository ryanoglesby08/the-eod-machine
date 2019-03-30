FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ .
RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start"]
