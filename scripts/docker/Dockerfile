FROM node:8.4.0

RUN mkdir /app
WORKDIR /app

COPY . /app
COPY ["scripts/docker/docker-start.sh", "/app"]

RUN npm install -g yarn pm2
RUN yarn install --production=false

EXPOSE 3000

CMD ["/bin/bash", "docker-start.sh"]
