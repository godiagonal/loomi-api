# Loomi REST API

Node/Express REST API for Loomi app. Uses MongoDB for storage.

Database files will be saved in `$HOME/data/loomi-db/` on the host system.

## Prerequisites

- `docker`: https://docs.docker.com/install/
- `docker-compose`: https://docs.docker.com/compose/install/#install-compose

## Development

Copy `.env-example` and name the new file `.env`.

```bash
# Run MongoDB container, append -d flag to run in background
docker-compose up loomi-db

# Stop and remove container
docker-compose down

# Run Node/Express app (port 3000)
npm start
```

You will have to apply header `X-Api-Key: key-from-env-file` to all requests for them to work.

## Production

- Copy `.env-example` and name the new file `.env`.
- Assign appropriate (strong!) passwords to variables `DB_ROOT_PWD` and `DB_PWD`.
- Assign API keys and client names, separated by comma, to variables `API_KEYS` and `API_CLIENTS`.

```bash
# Run Node/Express (port 80) and MongoDB container, append -d flag to run in background
docker-compose up

# Stop and remove containers
docker-compose down
```

You will have to apply header `X-Api-Key: key-from-env-file` to all requests for them to work.
