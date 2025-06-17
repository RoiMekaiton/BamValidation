#!/bin/bash

docker-compose build
docker tag devops_frontend roimek/bamvalidation_frontend:latest
docker tag devops_backend roimek/bamvalidation_backend:latest

docker image push roimek/bamvalidation_frontend:latest
docker image push roimek/bamvalidation_backend:latest
