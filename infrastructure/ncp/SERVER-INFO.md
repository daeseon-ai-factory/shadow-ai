# Seoul box — server & service info

A shared NCP Seoul box running the Mimi backend (and room for more services behind
Caddy). **Contains NO secrets** — safe to share. Secrets (SSH key, `.env`) are never
in this file and must never be shared. See [Security rules](#security-rules).

> Managed by Terraform in `infrastructure/ncp/`. Don't hand-edit infra that Terraform
> owns; change the `.tf` and `terraform apply`.

## Server

| | |
|---|---|
| Cloud / region | Naver Cloud Platform — **Seoul (KR-2)** |
| Public IP | `223.130.161.55` |
| Spec | `c2-g3` — 2 vCPU / 4 GB RAM |
| Disks | 10 GB boot (`/`) + **50 GB data (`/data`)** |
| OS | Ubuntu 22.04 LTS |
| Runtime | Docker + Docker Compose v2 |
| Edge / TLS | **Caddy** (reverse proxy, automatic Let's Encrypt) |
| DNS | Cloudflare (zone `daeseon.ai`) |
| IaC | `infrastructure/ncp/` (Terraform, provider `NaverCloudPlatform/ncloud`) |

## What's running — Mimi

- Public URL: **https://api.mimi.daeseon.ai** → Caddy → `backend:8080`
- Containers (in `/opt/mimi/docker-compose.yml`):
  - `backend` — Spring Boot API (`mimi-backend:latest`), port 8080 (internal only)
  - `db` — PostgreSQL 16 (internal only; data in a Docker volume)
  - `pot-provider` — `brainicism/bgutil-ytdlp-pot-provider` (YouTube transcript POToken)
  - `caddy` — reverse proxy, the only thing on public ports **80 / 443**

### Layout on the box
```
/opt/mimi/
  docker-compose.yml   # all services
  Caddyfile            # domain → service routing
  .env                 # SECRETS (chmod 600) — never commit/share
  backup.sh            # daily pg_dump
/data/                 # the 50 GB disk
  docker/              # Docker data-root (images + volumes)
  backups/             # daily DB dumps (7 days retained)
  swapfile             # 2 GB swap
/etc/cron.d/mimi-backup  # schedules backup.sh at 04:00 daily
```

## Access

- SSH is **key-based** (key name `mimi-ops`). The private key lives in
  `infrastructure/ncp/mimi-ops` (gitignored) — **do not share it.**
- `ssh -i mimi-ops root@223.130.161.55`

## Add a new service (one box, routed by domain)

1. Add a service to `/opt/mimi/docker-compose.yml`. **Always set a memory limit** so a
   runaway service can't OOM-kill Mimi:
   ```yaml
   myapp:
     image: myorg/myapp:latest
     restart: always
     mem_limit: 512m      # cap it
     # expose only to the docker network; Caddy reaches it by service name
   ```
2. Route a domain in `/opt/mimi/Caddyfile`:
   ```
   myapp.daeseon.ai {
       reverse_proxy myapp:8080
   }
   ```
3. In Cloudflare, add a DNS **A record**: `myapp` → `223.130.161.55`, **DNS only (grey
   cloud)** (so Caddy handles TLS).
4. `cd /opt/mimi && docker compose up -d` — Caddy fetches the TLS cert automatically
   once DNS points at the box.

> Capacity: this is a 4 GB box. Adding several services means bumping the spec
> (NCP: stop → change spec → start; `/data` persists). Size for the **sum** of memory.

## Backups

- **On-box**: `backup.sh` runs daily at 04:00 → `/data/backups/tubeshadow-<ts>.sql.gz`,
  keeps 7 days. Restore: `gunzip -c <dump>.sql.gz | docker compose exec -T db psql -U tubeshadow_admin -d tubeshadow`.
- **Off-box (TODO)**: an on-box backup dies with the box. Add a daily push to
  Cloudflare R2 (free tier) or NCP Object Storage for real disaster recovery.

## Common ops
```bash
cd /opt/mimi
docker compose ps                 # status
docker compose logs -f backend    # tail a service
docker compose restart caddy      # restart one service
docker compose up -d              # apply compose changes
df -h /data                       # disk usage
```

## Security rules

- **NEVER share** the `mimi-ops` SSH key or `/opt/mimi/.env`. Anyone with SSH/Docker
  access on this box effectively has **root** — they can read every secret and dump the
  user database.
- This box holds Mimi **production data + API keys**. For other people to deploy here,
  give them their **own scoped access** (separate non-root user / key) — or, safer, a
  **separate box**. Co-locating is fine for one owner's own services; it is a real risk
  with multiple people.
- Keep the SSH firewall (ACG) tight; consider locking port 22 to known IPs in
  `infrastructure/ncp/terraform.tfvars` (`allowed_ssh_cidr`).
