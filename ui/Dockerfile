FROM node:10-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ .
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["serve"]
