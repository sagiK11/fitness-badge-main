#!/bin/sh
set -e

ENV=$1

echo "Waiting for postgres..."
while ! nc -z $DB 5432; do
    sleep 0.1
done

if [ "$ENV" = "prod" ]; then
  echo "Running in production mode"
  npx prisma migrate deploy
else
  echo "Running in dev mode"
  npm run prisma:migrate:dev
fi

echo "Seeding database..."
npm run prisma:seed
