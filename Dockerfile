FROM node:alpine

RUN mkdir -p /usr/src/node-api
WORKDIR /usr/src/node-api

RUN yarn install
COPY . /usr/src/node-api/

EXPOSE 3333

CMD [ "yarn","run","start:dev"]