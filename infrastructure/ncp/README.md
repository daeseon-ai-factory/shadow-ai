# NCP Terraform starter — Mimi backend (Seoul)

Provisions one Seoul box (VPC + public subnet + firewall + server + public IP) to run
the Mimi backend via docker-compose. Migration steps after `apply` →
[`../ncp-migration-runbook.md`](../ncp-migration-runbook.md).

> Resource arguments here were taken from the official ncloud provider docs. The two
> environment-specific codes (`server_image_number`, `server_spec_code`) are **not**
> guessable — you fill them from the console (Step 3).

---

## Step 0 — Sign up & get keys (the only manual part)

1. **Create an NCP account** → https://www.ncloud.com (회원가입). You'll add a payment
   method; check the signup credit / startup program (search "네이버 클라우드 스타트업
   지원") to cover early months.
2. **Console** → https://console.ncloud.com
3. **Issue API keys** (this is what Terraform uses — NOT your login password):
   Console → **마이페이지 → 계정 관리 → 인증키 관리** (Account > Manage authentication key) →
   create an Access Key / Secret Key pair. Keep them secret.
4. **Install Terraform** → https://developer.hashicorp.com/terraform/install

Reference docs:
- Provider (registry): https://registry.terraform.io/providers/NaverCloudPlatform/ncloud/latest/docs
- Provider (GitHub): https://github.com/NaverCloudPlatform/terraform-provider-ncloud

## Step 1 — Export your keys (don't put them in any file)

```bash
# Pipe from your secret store; never commit these values.
export NCLOUD_ACCESS_KEY="$(grep '^NCLOUD_ACCESS_KEY=' ~/.secrets/api-keys.env | cut -d= -f2-)"
export NCLOUD_SECRET_KEY="$(grep '^NCLOUD_SECRET_KEY=' ~/.secrets/api-keys.env | cut -d= -f2-)"
```

(Add those two lines to `~/.secrets/api-keys.env` first if they aren't there.)

## Step 2 — Fill variables

```bash
cp terraform.tfvars.example terraform.tfvars
# edit: allowed_ssh_cidr = "<your-ip>/32"
```

## Step 3 — Get the image & spec codes (console)

In the console **Server → create** flow, pick **Ubuntu 22.04** and a **~2 vCPU / 4 GB**
spec, and copy their codes into `terraform.tfvars`:

```hcl
server_image_number = "..."   # the Ubuntu image number shown
server_spec_code    = "..."   # the 2vCPU/4GB spec code shown
```

(JVM needs the RAM — 4 GB is the safe floor; 2 GB only with swap.)

## Step 4 — Apply

```bash
terraform init
terraform plan      # review
terraform apply
```

## Step 5 — Connect

```bash
terraform output public_ip                                   # → point DNS here later
terraform output -raw ssh_private_key > mimi-key.pem
chmod 600 mimi-key.pem
ssh -i mimi-key.pem root@$(terraform output -raw public_ip)  # NCP default user may differ
```

Then follow [`../ncp-migration-runbook.md`](../ncp-migration-runbook.md) (Docker →
docker-compose → DB restore → DNS cutover → tear down AWS).

## Optional: managed PostgreSQL

Prefer Postgres on the box (cheapest, in docker-compose). For NCP **managed**
PostgreSQL instead, `mv postgresql.tf.optional postgresql.tf`, set
`export TF_VAR_db_password=...`, and re-apply.

---

## Honest caveats

- **`server_image_number` / `server_spec_code` are placeholders** — `plan` fails until
  you fill the real codes from the console (Step 3). This is deliberate, not a bug.
- **Zones**: Seoul has KR-1 / KR-2; confirm which your spec is available in.
- **Provider maturity**: the ncloud provider is official but thinner than AWS's. If an
  argument errors, check the registry doc for that resource.
- **Account + API key creation is manual** — Terraform manages resources, not the
  account itself. Everything after the keys is `terraform apply`.
- **Secrets**: keys via env only; `terraform.tfvars`, `*.tfstate`, and `*.pem` are
  gitignored — `tfstate` holds the generated private key, so never commit it.
