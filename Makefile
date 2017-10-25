NAME := $(shell basename $$PWD | sed -e s/[\\.-]//g)

## start server
serve:
	docker exec -it ${NAME}_web_1 npm start

## start workers
work:
	docker exec -it ${NAME}_web_1 npm run start:workers

## Runs webpack (development)
webpack:
	docker exec -it ${NAME}_web_1 npm run dev

## start docker shell
shell:
	docker exec -it ${NAME}_web_1 /bin/bash

## Run tests
test-server:
	docker exec -it ${NAME}_web_1 npm run test-server

## Run tests
test:
	docker exec -it ${NAME}_web_1 npm test

## Run tests
test-client:
	docker exec -it ${NAME}_web_1 npm run test-client

## Fill local db with some bootstrapped data
seed:
	tar xvfz scripts/db/dump.tar.gz -C scripts/db && docker exec -it ${NAME}_mongo_1 mongorestore -h localhost:27017 -d app /host-db/dump/icostats && rm -rf scripts/db/dump
