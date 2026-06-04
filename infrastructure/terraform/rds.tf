# rds.tf — the managed PostgreSQL database.
#
# RDS = AWS runs Postgres for you (patching, backups, failover). You pay for "managed" so you
# don't babysit a database server. This is the piece you wanted hands-on experience with.

# The master password: generated here, never typed by a human, and handed to Secrets Manager
# (see secrets.tf) so the app reads it at runtime. `random_password` lives in TF state, which is
# exactly why state must be treated as secret.
resource "random_password" "db" {
  length  = 32
  special = true
  # RDS rejects a few characters in the master password; exclude them.
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

# A DB subnet group tells RDS which subnets it may live in. It must span >= 2 AZs even if the
# instance itself is single-AZ. We use the PRIVATE subnets so the DB has no path to the internet.
resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-db-subnets"
  subnet_ids = aws_subnet.private[*].id
  tags       = { Name = "${var.project}-db-subnets" }
}

resource "aws_db_instance" "main" {
  identifier     = "${var.project}-db"
  engine         = "postgres"
  engine_version = "16"
  instance_class = var.db_instance_class

  allocated_storage = var.db_allocated_storage
  storage_type      = "gp3"
  storage_encrypted = true # encryption at rest, free, always on

  db_name  = var.db_name
  username = var.db_username
  password = random_password.db.result
  port     = 5432

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false # NEVER expose a database to the internet
  multi_az               = false # single-AZ for cost; flip to true for production HA (~2x cost)

  # 0 = automated backups OFF. The new credit-based "Free Plan" caps backup retention, so 7 is
  # rejected (FreeTierRestrictionError). Fine for a learning deploy (skip_final_snapshot is on too).
  # For a real DB: bump to 7 and set a backup_window (and upgrade the account plan).
  backup_retention_period = 0
  maintenance_window      = "Mon:09:00-Mon:10:00"

  # --- Teardown ergonomics (so you can `terraform destroy` cleanly while learning) ----------
  # For a REAL production DB, set these the other way: deletion_protection = true,
  # skip_final_snapshot = false. Here we optimize for "spin up, study, tear down to stop billing".
  deletion_protection = false
  skip_final_snapshot = true

  # Surface slow queries + errors to CloudWatch (cheap, very useful when something misbehaves).
  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = { Name = "${var.project}-db" }
}
