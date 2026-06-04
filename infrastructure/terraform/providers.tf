# providers.tf — configures the AWS provider and a set of tags applied to EVERY resource.
#
# default_tags is a quality-of-life feature: instead of writing tags on each resource, you set
# them once and the provider stamps them everywhere. This is how you make a bill readable
# ("what is this $4 charge?") and how you find/clean up everything later.

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = var.project
      ManagedBy = "terraform"
      Repo      = var.github_repo
    }
  }
}

# Handy data sources used across the other files:
# - caller_identity gives the AWS account ID (needed for the globally-unique S3 bucket name + ARNs)
# - availability_zones lists the AZs in this region (we spread subnets across two for HA)
data "aws_caller_identity" "current" {}

data "aws_availability_zones" "available" {
  state = "available"
}
