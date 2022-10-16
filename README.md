# home_network

## Get Started

- create env folder
- create env/postgres.env file
  - define db configuration in file: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

- create env/backend.env file
  - define db configuration in file: POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

start containers with *docker-compose up*

- attach to docker backend container and migrate the database with *python manage.py migrate*