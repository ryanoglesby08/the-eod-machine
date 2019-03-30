FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ .
RUN yarn build

EXPOSE 4000
ENTRYPOINT ["yarn"]
CMD ["start"]
