# @shahanahmed86/ts-server

## Prerequisites

- ### Resources
  - [Docker Engine](https://get.docker.com/ 'https://get.docker.com/')
  - [Docker Compose](https://docs.docker.com/engine/install/ubuntu/ 'https://docs.docker.com/engine/install/ubuntu/')
  - [NODE](https://nodejs.org/en/ 'https://nodejs.org/en/') or [NVM](https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm 'https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm')
  - [Make](https://linuxhint.com/install-make-ubuntu/ 'https://linuxhint.com/install-make-ubuntu/')
- ### Knowledge
  - Typescript
  - Restful
  - GraphQL with custom directives
  - Docker architecture
  - Container orchestration with docker-compose **_(at-least)_**
  - node:18 and its npm installer

## Implemented Feature

- User authentication APIs
- File Upload with express-fileupload
- Pre-commit hook to check linting/testing and formatting
- Chai & Mocha used to cover unit/api testing

## Installation

```sh
# Clone
git clone git@github.com:shahanahmed86/ts-server.git ts-server && cd $_

# to initiate the server run
npm exec init -- -FY

# flags
--yes || -Y # to skip question and go with default options
--force-reinstall || -F # to reinstall

# make a docker image, you can call multiple make script like this
make create-server-image

# to rebuild the image
make run-dev-up-rebuild

# development mode
npm run dev:up # start
npm run dev:down # end
npm run down:dev_hard # end with clearing data from the database

# production mode
make run-prod-up # start
make run-prod-down # end
```

## server

```sh
# execute bash inside of the container
docker exec -it <container_name> bash

# migrations can only run in development environment
# because start script has a pre script that run migration for it
# copy the DATABASE_URL from your secrets or .env file and
# paste the url and replace the @<host> with @localhost
# for example:
DB_HOST="localhost" DB_PORT=5433 npm run typeorm:up
# or replace the run-migration value in the Makefile like above and run
make run-typeorm:up

# to run test cases while development run like:
DB_HOST="localhost" npm run --ignore-scripts exec-tests
# or replace the run-test value in the Makefile like above and run
make run-test
```

## psql

```sh
# execute bash inside of the container
docker exec -it <container_name> bash

# execute  open psql
docker exec -it <container_name> psql --username=<user> -W --host=<host> --port=<port> <name>

# <name> is the database name

# flags
-it # for interactive
-W  # force password prompt (should happen automatically)
```

## redis
```sh
docker exec -it <container_name> redis-cli -a <password>
# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password
# redis commands
scan 0
get "unique_identifier"
ttl "unique_identifier"
del "unique_identifier"
flushall # delete all transactions
```

## git

```sh
git commit -m "message" --no-verify
# flags
--no-verify # it will not call pre-hook of commit where tests/linting will execute
```

## GraphQL is actually an extended version REST API

```sh
curl localhost/graphql -X POST \
-H 'content-type: application/json' \
-d '{"query":"mutation Mutation($username: String!, $password: String!) { data: adminLogin(username: $username, password: $password) { token } }","variables":"{\"username\":\"shahan\",\"password\":\"123Abc456\"}"}' | json_pp
```

## Development hacks

```sh
# ec2 or any other instance of linux
echo "Host ssh-app
  StrictHostKeyChecking no
  Hostname <ip>
  User <user>
  IdentityFile <path/to/file.pem>\n" >> ~/.ssh/config

# to ssh into the server, run this in your terminal
ssh ssh-app

# you can make an alias in your bashrc or zshrc file or create
# the script in the Makefile

# make short aliases to run bigger commands
alias ssh_deploy_server="scp -R path/to/folder ssh-app:path && ssh ssh-app 'cd path/to/project && git pull && make run-prod-up'"

# Now only need to know is to run the aliases which you've created.
```

NOTE: in order to avoid password/token prompt on git pull command you need to add ssh id_rsa.pub key to your github authorized [SSH Keys](https://github.com/settings/keys 'https://github.com/settings/keys')
