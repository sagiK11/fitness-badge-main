#!/bin/sh
set -e

echo "Waiting for postgres..."
while ! nc -z $DB 5432; do
    sleep 0.1
done

npm run prisma:migrate:dev
npm run prisma:seed
exec "$@"