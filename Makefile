NAME := $(shell basename $$PWD | sed -e s/[\\.-]//g)

shell: ## start docker shell
	docker exec -it ${NAME}_web_1 /bin/bash

test:  ## Run tests
	docker exec -it ${NAME}_web_1 npm test
