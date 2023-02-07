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

run-backup:
	docker exec -t accounts-app-psqldb-1 pg_dumpall -c -U admin > dumps/`date +%d-%m-%Y"_"%H_%M_%S`.sql

# only for dev environment
run-typeorm-up:
	DB_HOST="localhost" npm run typeorm:up

run-typeorm-down:
	DB_HOST="localhost" npm run typeorm:down