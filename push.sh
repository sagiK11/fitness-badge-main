#!/bin/bash

TAG=$1
USERNAME=sagik11
REPO=fitness-badge-main
IDENTIFIER=$USERNAME/$REPO
# SERVICES=("postgres" "api" "pgadmin" "admin" "app")
SERVICES=("postgres" "api" "admin")


for service in "${SERVICES[@]}"
do
    cd "$service"
    echo "building, tagging and pushing $service..."
    docker build -t $IDENTIFIER:$service-$TAG .
    docker push $IDENTIFIER:$service-$TAG 
    cd ..
done