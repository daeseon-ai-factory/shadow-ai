# versions.tf — pins Terraform + provider versions, and declares where state lives.
#
# WHY THIS FILE: reproducibility. Without version pins, two people (or you, six months apart)
# can get different provider behavior. The `required_version` guards the Terraform CLI itself;
# `required_providers` guards each provider plugin.

terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60" # 5.x line; ~> means ">=5.60.0, <6.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6" # used to generate the DB password + JWT secret
    }
  }

  # --- STATE BACKEND -----------------------------------------------------------------------
  # State is the file Terraform uses to map your .tf code to real AWS resources. By default it's
  # a LOCAL file (terraform.tfstate) in this directory. That's fine for one person learning, but:
  #   - it contains SECRETS in plaintext (DB password, JWT secret) → never commit it (see .gitignore)
  #   - it can't be shared / locked across a team
  #
  # For a real setup you migrate to an S3 backend with a DynamoDB lock table. It's commented out
  # because it's a chicken-and-egg (the bucket must exist before you can use it as a backend).
  # To adopt it later: create the bucket+table (in code or by hand), uncomment, run `terraform init
  # -migrate-state`.
  #
  # backend "s3" {
  #   bucket         = "tubeshadow-tfstate-<ACCOUNT_ID>"
  #   key            = "backend/terraform.tfstate"
  #   region         = "ca-central-1"
  #   dynamodb_table = "tubeshadow-tflock"
  #   encrypt        = true
  # }
}
