# security.tf — the three security groups (stateful virtual firewalls).
#
# The chain mirrors the request path, and each layer only trusts the one in front of it:
#
#   internet ──443──▶ [alb-sg]  ──8080──▶ [fargate-sg] ──5432──▶ [rds-sg]
#   (anyone)          the ALB              the app tasks          the database
#
# Note the source of each inbound rule is the PREVIOUS security group, not a CIDR. That's the
# important idea: the DB doesn't accept "5432 from 10.0.x.x", it accepts "5432 from whatever is
# in fargate-sg". So even another machine inside the VPC can't reach the DB unless it's the app.

# --- ALB: open to the world on 443 (HTTPS) and 80 (which we'll redirect to 443) -------------
resource "aws_security_group" "alb" {
  name        = "${var.project}-alb-sg"
  description = "Public-facing load balancer"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from anywhere (redirected to HTTPS)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound (so the ALB can reach the tasks)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-alb-sg" }
}

# --- Fargate tasks: accept the app port ONLY from the ALB ----------------------------------
resource "aws_security_group" "fargate" {
  name        = "${var.project}-fargate-sg"
  description = "App containers; only the ALB may reach them"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "App port from the ALB only"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id] # <-- source is the ALB's SG, not a CIDR
  }

  egress {
    description = "All outbound (pull image from ECR, read Secrets, call DB + Gemini)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-fargate-sg" }
}

# --- RDS: accept Postgres ONLY from the app tasks ------------------------------------------
resource "aws_security_group" "rds" {
  name        = "${var.project}-rds-sg"
  description = "Database; only the app tasks may reach it"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Postgres from the Fargate tasks only"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.fargate.id]
  }

  # No egress rules needed (the DB never initiates connections), but a default-deny egress would
  # block RDS internals; leave egress open which is the AWS default behavior for clarity.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-rds-sg" }
}
