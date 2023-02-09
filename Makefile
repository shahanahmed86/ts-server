# development
run-dev-up:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-up-rebuild:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d --build --renew-anon-volumes server --no-deps
run-dev-down:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.test.yml up \
	--abort-on-container-exit --build
run-test-down:
	docker-compose -p accounts-app \
	-f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.test.yml \
	down -v
run-test:
	DB_HOST="localhost" npm run --ignore-scripts exec-tests

# production
run-prod-up:
	docker stack deploy \
	-c docker-compose.yml -c docker-compose.prod.yml \
	accounts-app
run-prod-down:
	docker stack rm accounts-app

# backup/restore database
run-backup:
	docker exec -t accounts-app-db-1 pg_dumpall -c -U admin dev_database > dumps/`date +%d-%m-%Y"_"%H_%M_%S`.sql
run-restore:
	cat ${DUMP} | docker exec -i accounts-app-db-1 psql -U admin dev_database

# only for dev environment

# migration scripts
run-typeorm-up:
	DB_HOST="localhost" npm run typeorm:up
run-typeorm-down:
	DB_HOST="localhost" npm run typeorm:down
