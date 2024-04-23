# pids-service-api

# Requirment
- Docker

# Set up
- Create docker netword
  `docker network create pids`
- Start db
  `sh start-service.sh`
- Build image and run container
  `sh restart-container.sh`
- Run migration and seeder in container
  - `docker exec -it si_despar_service_api bash`
  - `npm run migrate`
  - `npm run seed`

# Stop service
- Run command in container
  `sh stop-service.sh`

# Reset DB
- Run command in container
  `npm run reset:db`