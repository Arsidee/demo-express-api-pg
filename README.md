# README

This is an Express API demo that illustrates a single-file backend Node/Express API with access to a PostgreSQL (Postgres) DB instance

## Prerequisites

**Windows**

You will need Docker installed
- [Instructions](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)

You will need WSL installed
- [Instructions](https://docs.docker.com/desktop/install/windows-install)

Run this to avoid errors related to line-endings
`git config --global core.autocrlf input`

**MacOS**

You will need Docker installed
- [Instructions](https://docs.docker.com/desktop/install/mac-install)


## Getting Started

1. Clone this project
2. Enter the project directory
3. Run: `docker compose run --rm app npm install`
4. Run: `docker compose up -d db; docker compose logs -f db` to bring up the container and watch the logs
5. Wait until the DB container is up and running, then hit `Ctrl+C` to detach from the log stream
5. Run: `docker compose up -d app; docker compose logs -f app` to bring up the app and watch the logs
6. Navigate to `http://localhost:3000/health` in your browser to confirm the API is running and serving traffic

When you're done, run: `docker compose down` to clean up the containers
