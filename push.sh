#!/bin/bash

TAG="${1:-latest}"
USERNAME=sagik11
REPO=fitness-badge-main
IDENTIFIER=$USERNAME/$REPO
SERVICES=("api" "app" "admin")


for service in "${SERVICES[@]}"
do
    cd "$service"
    echo "building, tagging and pushing $service..."
    docker build --platform=linux/amd64 -t $IDENTIFIER:$service-$TAG .
    docker push $IDENTIFIER:$service-$TAG 
    cd ..
done