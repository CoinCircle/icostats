FROM node:8.4.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY . /app

RUN npm install -g yarn
RUN yarn install
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
