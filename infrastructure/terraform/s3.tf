# s3.tf — the private bucket that stores user audio recordings.
#
# The app writes/reads recordings here via its IAM task role (see iam.tf) — never via public URLs.
# Bucket names are GLOBALLY unique across all of AWS, so we suffix with the account ID.

resource "aws_s3_bucket" "recordings" {
  bucket = "${var.project}-recordings-${data.aws_caller_identity.current.account_id}"
  tags   = { Name = "${var.project}-recordings" }
}

# Block ALL public access. Four separate switches; turn them all on. A recording is private user
# data — it must only be reachable through the backend, which authorizes the user first.
resource "aws_s3_bucket_public_access_block" "recordings" {
  bucket                  = aws_s3_bucket.recordings.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Encrypt every object at rest with S3-managed keys (free).
resource "aws_s3_bucket_server_side_encryption_configuration" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Versioning = cheap insurance: an accidental overwrite/delete keeps the old copy.
resource "aws_s3_bucket_versioning" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Lifecycle: don't keep old versions forever (they cost storage). Expire noncurrent ones after 30d.
resource "aws_s3_bucket_lifecycle_configuration" "recordings" {
  bucket = aws_s3_bucket.recordings.id
  rule {
    id     = "expire-noncurrent"
    status = "Enabled"
    filter {} # apply to the whole bucket
    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}
