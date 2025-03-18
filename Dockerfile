FROM node:8.11.3-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./app.js ./
COPY ./img ./img
COPY ./map ./map
COPY ./public ./public
COPY ./views ./views

CMD [ "npm", "start" ]