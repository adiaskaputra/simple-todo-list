FROM node:8.11-alpine

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /app/
RUN npm install

COPY . /app

ENV PORT 3030
EXPOSE $PORT
CMD [ "npm", "start" ]
