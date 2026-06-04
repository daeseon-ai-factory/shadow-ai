# outputs.tf — the values you need AFTER `terraform apply`, printed to the terminal.
# Re-print anytime with `terraform output` (or `terraform output -raw <name>` for one value).

output "alb_dns_name" {
  description = "Point your API domain at this. In Cloudflare add a CNAME: api -> this value (DNS-only / grey cloud, NOT proxied — an ALB already does TLS)."
  value       = aws_lb.main.dns_name
}

output "acm_validation_records" {
  description = "Add THESE CNAME records in Cloudflare so ACM can validate + issue the TLS cert. After they propagate, the cert auto-issues in a few minutes."
  value = [
    for o in aws_acm_certificate.api.domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ]
}

output "api_domain" {
  description = "The public hostname the cert is for / the app expects."
  value       = var.api_domain
}

output "rds_endpoint" {
  description = "The database hostname (private — only reachable from the app). Useful for debugging."
  value       = aws_db_instance.main.address
}

output "ecr_repository_url" {
  description = "Where CI pushes the image (and where ECS pulls it)."
  value       = aws_ecr_repository.backend.repository_url
}

output "recordings_bucket" {
  description = "The S3 bucket holding user recordings."
  value       = aws_s3_bucket.recordings.bucket
}

output "github_deploy_role_arn" {
  description = "The role GitHub Actions assumes. The deploy workflow builds the ARN from AWS_ACCOUNT_ID; this is the full ARN for reference."
  value       = aws_iam_role.github_deploy.arn
}

output "aws_account_id" {
  description = "Set this as the GitHub Actions repo secret AWS_ACCOUNT_ID (deploy.yml uses it to build the role ARN)."
  value       = data.aws_caller_identity.current.account_id
}

output "next_steps" {
  description = "What to do after apply."
  value       = <<-EOT

    DONE provisioning. Now:
    1. Cloudflare DNS:
       - add the CNAME(s) in `acm_validation_records` (cert validation)
       - add CNAME: ${var.api_domain} -> ${aws_lb.main.dns_name}  (DNS-only / grey cloud)
    2. GitHub repo → Settings → Secrets → Actions: add AWS_ACCOUNT_ID = ${data.aws_caller_identity.current.account_id}
    3. Trigger the deploy workflow (push to ${var.github_branch}, or run it manually) to build + push
       the first image. The ECS service will go healthy once the image lands.
    4. Smoke test: curl https://${var.api_domain}/api/health   ->  {"data":{"status":"ok"}}
  EOT
}
