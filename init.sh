#!/bin/bash

DC_FILE=docker-compose.yml

docker-compose down -v
docker-compose -f $DC_FILE build 
docker-compose -f $DC_FILE up -d