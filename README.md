# Demo Express API (Postgres)

A single-file Node/Express API demonstrating CRUD operations backed by PostgreSQL, fully containerized with Docker Compose.

## Prerequisites

**Windows**

- [Docker Desktop](https://docs.docker.com/desktop/install/windows-install)
- [WSL](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)
- Run `git config --global core.autocrlf input` to avoid line-ending errors

**macOS**

- [Docker Desktop](https://docs.docker.com/desktop/install/mac-install)

## Getting Started

1. Clone the repo and enter the project directory
2. Install dependencies:
   ```sh
   docker compose run --rm app npm install
   ```
3. Start the database:
   ```sh
   docker compose up -d db
   ```
   Watch logs with `docker compose logs -f db` — wait until it says "ready to accept connections", then `Ctrl+C` to detach.
4. Start the app:
   ```sh
   docker compose up -d app
   ```
5. Confirm it's running at [http://localhost:3000/health](http://localhost:3000/health)

When you're done:
```sh
docker compose down
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Health check |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get a user by ID |
| POST | `/users` | Create a user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Request Body (POST / PUT)

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 33,
  "weight": 155.1,
  "smoker": false
}
```

### Examples

List all users:
```sh
curl http://localhost:3000/users
```

Create a user:
```sh
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","age":33,"weight":155.1,"smoker":false}'
```

## Project Structure

```
├── compose.yml          # Docker Compose services (app + db)
├── db/
│   └── setup.sql        # Table schema and seed data
└── src/
    ├── app.js           # Express server and route handlers
    ├── configuration.js # Database connection config
    └── package.json
```

## Database Persistence

By default the database is ephemeral — data is lost when the container is removed. To enable persistence, uncomment the volume lines in `compose.yml`:

```yaml
volumes:
  - postgres:/var/lib/postgresql/data

# and at the bottom:
volumes:
  postgres:
```
