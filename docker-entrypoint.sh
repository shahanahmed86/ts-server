#!/bin/bash
set -euo pipefail

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(<"${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env 'APP_PORT'
file_env 'APP_PROTOCOL'
file_env 'APP_HOST'
file_env 'BCRYPT_SALT'
file_env 'BCRYPT_MAX_BYTES'
file_env 'JWT_ACCESS'
file_env 'JWT_ACCESS_LIFE'
file_env 'JWT_REFRESH'
file_env 'JWT_REFRESH_LIFE'
file_env 'DB_HOST'
file_env 'DB_USER'
file_env 'DB_PASS'
file_env 'DB_NAME'
file_env 'DB_PORT'
file_env 'REDIS_HOST'
file_env 'REDIS_PORT'
file_env 'REDIS_PASSWORD'
file_env 'SESSION_SECRET'

exec "$@"
