NAME := $(shell basename $$PWD | sed -e s/[\\.-]//g)

## start server
serve:
	docker exec -it ${NAME}_web_1 npm start

## Runs webpack (development)
make webpack:
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
