FROM node:7.4.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN npm install -g yarn
RUN yarn install

COPY . /app

EXPOSE 3000

ENTRYPOINT /bin/sh
