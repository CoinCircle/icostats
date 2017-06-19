NAME := $(shell basename $$PWD | sed -e s/[\\.-]//g)

serve: ## start server
	docker exec -it ${NAME}_web_1 npm start

shell: ## start docker shell
	docker exec -it ${NAME}_web_1 /bin/bash

test-server:  ## Run tests
	docker exec -it ${NAME}_web_1 npm run test-server

test:  ## Run tests
	docker exec -it ${NAME}_web_1 npm test

test-client:  ## Run tests
	docker exec -it ${NAME}_web_1 npm run test-client
