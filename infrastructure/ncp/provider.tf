# Provider auth comes from env vars — NEVER hardcode keys here:
#   export NCLOUD_ACCESS_KEY=...
#   export NCLOUD_SECRET_KEY=...
# (pipe from ~/.secrets/api-keys.env; never commit secret values)
provider "ncloud" {
  region      = var.region # "KR" = Seoul
  site        = "public"   # "public" | "gov" | "fin"
  support_vpc = true       # required true — provider only supports the VPC platform
}
