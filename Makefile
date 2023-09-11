create-image:
	docker build -t 127.0.0.1:5000/ts-server:1.0.0 . && \
	docker push 127.0.0.1:5000/ts-server:1.0.0

# development
run-dev-up:
	docker compose \
	-p app-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-rebuild:
	docker compose \
	-p app-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d --build server --renew-anon-volumes --no-deps
run-dev-down:
	docker compose \
	-p app-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker compose \
	-p app-dev \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker compose \
	-p app-test \
	-f docker-compose.yml -f docker-compose.test.yml \
	up --abort-on-container-exit --renew-anon-volumes --build
run-test-down:
	docker compose \
	-p app-test \
	-f docker-compose.yml -f docker-compose.test.yml \
	down -v
run-test:
	NODE_ENV="test" \
	DB_HOST="localhost" DB_PORT="5433" \
	REDIS_HOST="localhost" REDIS_PORT="6380" \
	npm run exec-tests --ignore-scripts

# production
run-prod-up:
	docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml app
run-prod-down:
	docker stack rm app

# backup/restore database
run-backup:
	docker exec -t app-dev-db-1 pg_dumpall -c --username="admin" > dumps/`date +%d-%m-%Y"_"%H_%M_%S`.sql
run-restore:
	cat ${DUMP} | docker exec -i app-dev-db-1 psql --username="admin"

# only for dev environment

# migration scripts
run-typeorm-up:
	DB_HOST="localhost" DB_PORT="5433" npm run typeorm:up
run-typeorm-down:
	DB_HOST="localhost" DB_PORT="5433" npm run typeorm:down
