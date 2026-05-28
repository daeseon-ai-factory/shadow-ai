# AWS Bootstrap — first-time setup

This is a one-time checklist to wire AWS for TubeShadow. Once done, every code change
flows through GitHub Actions → ECR → ECS automatically.

> **Region**: `ca-central-1` (Canada Central — Toronto/Montreal)
> **Estimated time**: 3–5 hours for first AWS user. Faster if you've done it before.

Replace `ACCOUNT_ID` everywhere with your 12-digit AWS account ID
(`aws sts get-caller-identity --query Account --output text`).

---

## 0. Account hygiene (10 min, do not skip)

1. Sign into root → enable MFA (1Password / Authy)
2. IAM → Users → create `admin` user
3. Attach `AdministratorAccess` policy, enable MFA, create access key
4. **Stop using root.** From now on log in as `admin`.
5. Local: `aws configure` → paste admin's access key. Region: `ca-central-1`.

## 1. VPC (15 min)

Console → VPC → "Create VPC and more"
- Name: `tubeshadow`
- IPv4 CIDR: `10.0.0.0/16`
- 2 AZs, 2 public + 2 private subnets, 1 IGW
- **NAT Gateway: None** (NAT is $35/mo. Public subnet Fargate can pull ECR without it.)
- VPC endpoints: None for now

## 2. Security Groups (10 min)

VPC → Security Groups → create three:

| Name | Inbound |
|---|---|
| `alb-sg` | 443 from 0.0.0.0/0 |
| `fargate-sg` | 8080 from `alb-sg` |
| `rds-sg` | 5432 from `fargate-sg` |

## 3. RDS PostgreSQL (15 min)

Console → RDS → Create database
- PostgreSQL 16, Free Tier template
- DB identifier: `tubeshadow-db`
- Master username: `tubeshadow_admin`
- Password: **let RDS auto-generate** + store in Secrets Manager
- VPC: `tubeshadow` / Private subnets
- Public access: **No**
- Security group: `rds-sg`
- Initial DB name: `tubeshadow`
- Storage: 20 GB gp3 (Free Tier)
- Backup retention: 7 days
- Deletion protection: **Yes**

After ~10 min, copy the endpoint hostname.

## 4. S3 bucket (5 min)

S3 → Create bucket
- Name: `tubeshadow-recordings-ACCOUNT_ID`
- Region: `ca-central-1`
- Block all public access: **Yes** (keep it private; backend reads via IAM role)
- Versioning: Enable (cheap insurance against accidental deletes)
- Default encryption: SSE-S3 (free)
- Lifecycle rule: noncurrent versions → delete after 30 days

## 5. Secrets Manager (10 min)

Create 4 secrets (Console → Secrets Manager → Store secret → Other):

```
tubeshadow/database-url         = jdbc:postgresql://<rds-endpoint>:5432/tubeshadow
tubeshadow/database-password    = (paste from RDS-generated secret above)
tubeshadow/jwt-secret           = (openssl rand -base64 48)
tubeshadow/anthropic-api-key    = (your Claude key, or empty string if not using AI)
```

Note each secret's ARN — they go into `ecs-task-definition.json`.

## 6. ECR repository (2 min)

```bash
aws ecr create-repository \
  --repository-name tubeshadow \
  --image-scanning-configuration scanOnPush=true \
  --region ca-central-1
```

## 7. IAM roles (20 min, the part that confuses people)

### A. `ecsTaskExecutionRole` — lets ECS pull images and write logs

Console → IAM → Roles → Create role
- Trusted entity: AWS service → Elastic Container Service → Elastic Container Service Task
- Attach policy: `AmazonECSTaskExecutionRolePolicy`
- Add inline policy for Secrets Manager access:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "arn:aws:secretsmanager:ca-central-1:ACCOUNT_ID:secret:tubeshadow/*"
  }]
}
```

### B. `tubeshadowTaskRole` — lets the running app talk to S3

Same trusted entity. Inline policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject","s3:PutObject","s3:DeleteObject","s3:HeadObject"],
    "Resource": "arn:aws:s3:::tubeshadow-recordings-ACCOUNT_ID/*"
  }]
}
```

### C. `GitHubActionsDeploy` — lets GitHub Actions push images + update ECS

First, create the OIDC provider once (no static keys needed):
```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

Then the role with trust policy (replace `YOUR_GH_USER/shadow-ai`):
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike": { "token.actions.githubusercontent.com:sub": "repo:YOUR_GH_USER/shadow-ai:*" }
    }
  }]
}
```

Attach an inline policy with: `ecr:*` on tubeshadow repo, `ecs:UpdateService`,
`ecs:DescribeServices`, `ecs:RegisterTaskDefinition`, `iam:PassRole` on the two task roles.

## 8. ECS cluster + service (30 min)

```bash
aws ecs create-cluster --cluster-name tubeshadow-cluster
aws logs create-log-group --log-group-name /ecs/tubeshadow-backend
```

Edit `infrastructure/ecs-task-definition.json` — replace every `ACCOUNT_ID` with yours,
plus `YOUR_DOMAIN.com`. Then register:

```bash
aws ecs register-task-definition \
  --cli-input-json file://infrastructure/ecs-task-definition.json
```

Create service (Console is easier first time):
- Cluster: `tubeshadow-cluster`
- Launch type: Fargate
- Task definition: `tubeshadow:1`
- Desired count: 1
- VPC: `tubeshadow`, Private subnets, `fargate-sg`
- Public IP: Disabled (it's behind the ALB)
- Load balancer: Application LB → create new `tubeshadow-alb` in public subnets,
  attach `alb-sg`, target group → port 8080, health check `/api/health`

## 9. HTTPS + DNS (45 min, includes propagation wait)

1. ACM (must be `ca-central-1` to match ALB) → request public certificate for
   `api.YOUR_DOMAIN.com` + `*.YOUR_DOMAIN.com`. Choose DNS validation.
2. Route 53 → create hosted zone for `YOUR_DOMAIN.com`. Copy the 4 nameservers.
3. At your current domain registrar (Namecheap/GoDaddy/Cloudflare) → set
   nameservers to the 4 from Route 53. Wait 5 min – 6 hr to propagate.
4. ACM → "Add records in Route 53" button (auto-creates CNAMEs).
5. ALB listener 443 → add ACM certificate → forward to target group.
6. Route 53 → A record `api.YOUR_DOMAIN.com` → Alias → ALB.

## 10. GitHub repository secrets (5 min)

GitHub repo → Settings → Secrets and variables → Actions:
- `AWS_ACCOUNT_ID` = your 12-digit account ID

Now push to `main` → `.github/workflows/deploy.yml` runs → image goes to ECR →
ECS rolls a new task. Watch in Actions tab.

## 11. Vercel for the frontend (10 min)

```bash
cd frontend && npx vercel
```
Set env: `NEXT_PUBLIC_API_URL=https://api.YOUR_DOMAIN.com`
Add custom domain `www.YOUR_DOMAIN.com` → Vercel gives you a CNAME → add in Route 53.

## 12. Smoke test

```
https://www.YOUR_DOMAIN.com           # frontend
https://api.YOUR_DOMAIN.com/api/health # backend
```

Then sign up, import a video, make a clip — verify the recording lands in S3 and
the DB row in RDS.

---

## What you've now learned (interview-ready)

After finishing this once, you can honestly say in an interview:
- VPC subnetting + security groups
- IAM roles with least-privilege (Task role vs Execution role distinction)
- OIDC for keyless CI/CD
- Secrets Manager integration with ECS task definitions
- Fargate task lifecycle, ALB health checks
- ACM + Route 53 + DNS propagation
- ECR image lifecycle policies
- CloudWatch Logs from containerized apps

That's about 60% of the AWS Solutions Architect Associate exam content, learned by doing.
