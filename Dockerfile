FROM node:alpine

RUN mkdir -p /usr/src/node-api
WORKDIR /usr/src/node-api

COPY . /usr/src/node-api/
RUN yarn install

EXPOSE 3333

CMD [ "yarn","run","start:dev"]