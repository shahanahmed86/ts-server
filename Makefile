# development
run-dev-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-rebuild:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d --build server --renew-anon-volumes --no-deps && \
	make run-dev-up
run-dev-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	up --abort-on-container-exit --renew-anon-volumes --build
run-test-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	down -v
run-test:
	NODE_ENV="test" \
	DB_HOST="localhost" REDIS_HOST="localhost" \
	npm run exec-tests --ignore-scripts

run-migrate-create:
	DB_HOST="localhost" npm run migrate-dev create ${NAME}
run-migrate-up:
	DB_HOST="localhost" npm run migrate-dev up
run-migrate-down:
	DB_HOST="localhost" npm run migrate-dev down ${NAME}
run-migrate-prune:
	DB_HOST="localhost" npm run migrate-dev prune

# production
run-prod-up:
	docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml app
run-prod-down:
	docker stack rm app
