#!/bin/sh
set -e

ENV="${1:-dev}"


npm run prisma:migrate:$ENV
npm run prisma:seed
npm run start:$ENV

exec "$@"