#!/bin/bash

USERNAME=sagik11
REPO=fitness-badge-main
IDENTIFIER=$USERNAME/$REPO
TAG=$(echo "${{ github.sha }}" | cut -c1-7)
# SERVICES=("postgres" "api" "pgadmin" "admin" "app")
SERVICES=("postgres"  "app")


for service in "${SERVICES[@]}"
do
    cd "$service"
    echo "building, tagging and pushing $service..."
    docker build -t $IDENTIFIER:$service-$TAG .
    docker tag $REPO-$service $IDENTIFIER:$service-$TAG
    docker push $IDENTIFIER:$service-$TAG 
    cd ..
done