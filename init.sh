#!/bin/bash

DC_FILE=docker-compose.yml

docker-compose down -v --remove-orphans
docker-compose -f $DC_FILE build 
docker-compose -f $DC_FILE up -d
docker-compose -f $DC_FILE exec api ./init.sh