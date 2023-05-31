#!/bin/bash

USERNAME=sagik11
REPO=fitness-badge-main
IDENTIFIER=$USERNAME/$REPO
TAG=${{ github.sha:0:7 }}
# SERVICES=("postgres" "api" "pgadmin" "admin" "app")
SERVICES=("postgres")


echo "Tag: $TAG"
for service in "${SERVICES[@]}"
do
    cd "$service"
    echo "building, tagging and pushing $service..."
    docker build -t $IDENTIFIER:$service-$TAG .
    docker push $IDENTIFIER:$service-$TAG 
    cd ..
done