#!/bin/sh
set -e

ENV="${1:-dev}"

echo "Waiting for postgres..."
while ! nc -z $DB 5432; do
    sleep 0.1
done

npm run prisma:migrate:$ENV
npm run prisma:seed
npm run start:$ENV

exec "$@"