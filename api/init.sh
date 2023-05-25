#!/bin/sh
set -e

ENV=$1

echo "Waiting for postgres..."
while ! nc -z $DB 5432; do
    sleep 0.1
done

if [ "$ENV" = "prod" ]; then
  npm run prisma:migrate:prod
  npm run prisma:seed
  npm run start:prod
else
  npm run prisma:migrate:dev
  npm run prisma:seed
  npm run start:dev
fi

exec "$@"