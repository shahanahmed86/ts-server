create-image:
	docker build -t 127.0.0.1:5000/ts-server:1.0.0 . && \
	docker push 127.0.0.1:5000/ts-server:1.0.0

# development
run-dev-up:
	docker compose -p accounts-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-up-rebuild:
	docker compose -p accounts-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d --build --renew-anon-volumes server
run-dev-down:
	docker compose -p accounts-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker compose -p accounts-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker compose -p accounts-test \
	-f docker-compose.yml -f docker-compose.test.yml up \
	--abort-on-container-exit --renew-anon-volumes --build
run-test-down:
	docker compose -p accounts-test \
	-f docker-compose.yml -f docker-compose.test.yml down \
	-v
run-test:
	DB_HOST="localhost" npm run --ignore-scripts exec-tests

# production
run-prod-up:
	docker stack deploy \
	-c docker-compose.yml -c docker-compose.prod.yml \
	accounts
run-prod-down:
	docker stack rm accounts

# backup/restore database
run-backup:
	docker exec -t accounts-dev-db-1 pg_dumpall -c --username="admin" > dumps/`date +%d-%m-%Y"_"%H_%M_%S`.sql
run-restore:
	cat ${DUMP} | docker exec -i accounts-dev-db-1 psql --username="admin"

# only for dev environment

# migration scripts
run-typeorm-up:
	DB_HOST="localhost" npm run typeorm:up
run-typeorm-down:
	DB_HOST="localhost" npm run typeorm:down
