#!/bin/bash

DC_FILE=docker-compose.github.yml
USERNAME=sagik11
REPO=fitness-badge-main
IDENTIFIER=$USERNAME/$REPO
TAG=$(echo "${{ github.sha }}" | cut -c1-7)
SERVICES=("postgres" "api" "pgadmin" "admin" "app")

docker-compose down -v --remove-orphans
docker-compose -f $DC_FILE build --parallel

for service in "${SERVICES[@]}"
do
    echo "tagging and pushing $service..."
    docker tag $REPO-$service $IDENTIFIER:$service-$TAG
    docker push $IDENTIFIER:$service-$TAG 
done