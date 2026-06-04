# Mimi backend — AWS infrastructure (Terraform)

This is the **entire backend deployment as code**. `terraform apply` builds the network, the
database, the registry, the secrets, the IAM, the load balancer, and the ECS service — everything
in the diagram below. Read it file by file; each `.tf` is one concern and is commented to teach,
not just to work.

> You run the billable `terraform`/`aws` commands. This repo just describes what gets built.

---

## The architecture

```
                          ┌───────────────────────────── Cloudflare DNS ─────────────────────────────┐
                          │  api.mimi.daeseon.ai  ──CNAME──▶  <alb>.elb.amazonaws.com  (DNS-only)      │
                          └───────────────────────────────────┬───────────────────────────────────────┘
                                                               │  HTTPS (TLS via ACM cert)
   GitHub Actions                                              ▼
   (push to main)                                  ┌──────────────────────┐
        │ OIDC, keyless                            │   Application LB      │  public subnets, :443
        │ assume GitHubActionsDeploy               │   (alb-sg)           │  health-checks /api/health
        ▼                                          └───────────┬──────────┘
   build jar → docker → push                                   │ HTTP :8080  (only ALB may reach tasks)
        │                                                      ▼
        ▼                                          ┌──────────────────────┐
   ┌─────────┐   pull image    ┌───────────────────│  ECS Fargate task    │  public subnet + public IP
   │   ECR   │◀────────────────│  (the executor)   │  Spring Boot :8080    │  (fargate-sg)
   └─────────┘                 └─────────┬─────────│  task role → S3       │
                                         │         └──────────┬───────────┘
                  read secrets at launch │                    │ Postgres :5432 (only tasks may reach DB)
                                         ▼                    ▼
                              ┌────────────────────┐  ┌──────────────────────┐
                              │  Secrets Manager   │  │   RDS PostgreSQL 16   │  private subnets
                              │  db-url, db-pass,  │  │   (rds-sg, no public) │  no internet route
                              │  jwt, gemini-key   │  └──────────────────────┘
                              └────────────────────┘
                                         ▲
                                         │ app reads/writes recordings
                              ┌────────────────────┐
                              │  S3 (recordings)   │  private bucket
                              └────────────────────┘
```

**The request path, in one sentence:** Cloudflare points your domain at the ALB → the ALB
terminates TLS and forwards `:8080` to a healthy Fargate task → the task talks to RDS (private)
and S3 (private), with its DB password + keys injected from Secrets Manager at launch.

**The security model is "each layer only trusts the one in front":** the internet can reach only
the ALB; only the ALB can reach the tasks; only the tasks can reach the database. See `security.tf`.

---

## The files (read in this order)

| File | What it builds | The idea to take away |
|---|---|---|
| `versions.tf` | TF + provider pins, state backend | reproducibility; state holds secrets |
| `providers.tf` | AWS provider, default tags | tag everything → readable bill |
| `variables.tf` | every input | secrets are `sensitive`, never in code |
| `network.tf` | VPC, 2 public + 2 private subnets, IGW, routes | **no NAT** (public Fargate) to save ~$32/mo |
| `security.tf` | alb-sg → fargate-sg → rds-sg | SGs reference SGs, not IP ranges |
| `rds.tf` | PostgreSQL, private, generated password | managed DB; password never typed |
| `s3.tf` | recordings bucket, fully private | block-public-access + encryption |
| `secrets.tf` | Secrets Manager entries | values out of the task def + git |
| `ecr.tf` | private image registry | CI pushes here, ECS pulls |
| `iam.tf` | execution role, task role, OIDC deploy role | least privilege; keyless CI |
| `alb.tf` | load balancer, target group, ACM cert, listeners | TLS termination + health checks |
| `ecs.tf` | cluster, task definition, service | TF creates once, **CI owns deploys** |
| `outputs.tf` | DNS/cert records, role ARN, etc. | what you wire up after apply |

---

## How to apply

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars     # then put your gemini key in it

terraform init        # downloads the AWS provider, writes .terraform.lock.hcl
terraform fmt -check   # (optional) formatting
terraform validate     # syntax + internal consistency — no AWS calls, free
terraform plan         # shows exactly what it WILL create — read this before applying
terraform apply        # creates it (billable). ~10-15 min, mostly RDS.
```

After `apply`, do what `terraform output next_steps` prints:
1. **Cloudflare**: add the `acm_validation_records` CNAME(s), and `api.mimi.daeseon.ai` → `alb_dns_name`
   (DNS-only / grey cloud — the ALB already does TLS; don't double-proxy through Cloudflare).
2. **GitHub**: repo → Settings → Secrets → Actions → `AWS_ACCOUNT_ID` = the `aws_account_id` output.
3. **Deploy the app**: push to `main` (or run the deploy workflow manually). The first image build
   pushes to ECR and the ECS service goes healthy.
4. **Smoke test**: `curl https://api.mimi.daeseon.ai/api/health` → `{"data":{"status":"ok"}}`.

> **First-apply note:** the ECS service is created pointing at `ECR:latest`, which doesn't exist
> until step 3. So tasks fail to start until you push an image — that's expected, not a bug.

---

## Cost (the honest number)

Rough monthly, on-demand, `ca-central-1`, single-AZ, 1 task:

| Resource | ~Monthly |
|---|---|
| Application Load Balancer | ~$16 (the floor — billed even when idle) |
| RDS `db.t4g.micro` + 20 GB gp3 | ~$13 |
| Fargate (0.5 vCPU / 1 GB, 1 task, 24/7) | ~$10 |
| S3 / Secrets / ECR / logs | ~$1–3 |
| **Total** | **~$40 / month** |

On a credit-based account, this consumes ~$40/mo of credit. **The cheapest way to "learn it once"
is: apply → study the running system → `terraform destroy` to stop the meter.** Re-applying later
is one command.

## Teardown

```bash
terraform destroy
```
Removes everything this code created. (RDS `deletion_protection` and `skip_final_snapshot` are set
for easy teardown — flip them in `rds.tf` for a real production database you don't want to lose.)

---

## What this is deliberately NOT (yet)

- **No NAT gateway** — saved by running Fargate in public subnets with a public IP. Fine here;
  in a stricter setup you'd use private subnets + NAT (or VPC endpoints).
- **No multi-AZ RDS / no autoscaling / no WAF** — single-AZ DB and one task to keep cost down.
- **Remote state is commented out** — local state is fine for one learner; the S3 backend block in
  `versions.tf` shows how to graduate to shared, locked state.
- **DNS automation** — your DNS is on Cloudflare, so cert validation + the API record are added by
  hand (the records are in the outputs). With Route53 you'd automate this with `aws_route53_record`.
