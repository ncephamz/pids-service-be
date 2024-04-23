#!/bin/bash
docker-compose -f services/postgres/docker-compose.yml down
docker-compose -f services/minio/docker-compose.yml down
docker-compose -f services/directus/docker-compose.yml down
docker-compose -f docker-compose.yml down