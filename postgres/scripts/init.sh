#!/bin/bash
echo "creating database $POSTGRES_DB..."

while ! nc -z postgres 5432; do
    sleep 0.1
done

psql -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $POSTGRES_DB WITH (FORCE);"
echo "SELECT 'CREATE DATABASE $POSTGRES_DB' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$POSTGRES_DB')\gexec" | psql
echo "database $POSTGRES_DB created"

echo "restoring $POSTGRES_DB database from backup..."
psql -U $POSTGRES_USER $POSTGRES_DB < ../backup/$POSTGRES_DB

