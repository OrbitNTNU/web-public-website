# Deployment

Production runs as a systemd service that manages docker compose.

## Deploy new changes

```bash
git pull
sudo systemctl restart public-website.service
```

That's it. The service rebuilds the image and swaps the container.

## Check status

```bash
sudo systemctl status public-website.service
docker compose ps
docker compose logs -f web-app
```

## Manual container ops

Run from this directory:

- Rebuild without restart: `docker compose build`
- Restart without rebuild: `docker compose restart`
- Full stop: `sudo systemctl stop public-website.service`
- Full start: `sudo systemctl start public-website.service`

## Environment

Required env vars live in `web-app/.env` (symlinked to `web-app/deployment/.env` here). Build-time
vars (`NEXT_PUBLIC_SANITY_*`) are wired through `docker-compose.yml` `args:`.
Runtime vars come from `env_file:`.
