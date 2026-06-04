# alb.tf — the Application Load Balancer: the public HTTPS front door for the API.
#
#   client ──https://api.mimi.daeseon.ai──▶ [ALB :443] ──http :8080──▶ [Fargate task]
#
# The ALB terminates TLS (using the ACM certificate), health-checks the tasks, and forwards
# traffic only to healthy ones. It's also what gives you a stable hostname while tasks come and go.

resource "aws_lb" "main" {
  name               = "${var.project}-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id # ALB needs >= 2 public subnets across AZs
  tags               = { Name = "${var.project}-alb" }
}

# Target group = the pool of task IPs the ALB forwards to. target_type "ip" is required for
# Fargate (awsvpc networking — each task gets its own ENI/IP).
resource "aws_lb_target_group" "backend" {
  name        = "${var.project}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  # The ALB calls this every 30s; a task must answer 200 here to receive traffic. This is the
  # same endpoint the app permit-lists publicly (SecurityConfig allows /api/health).
  health_check {
    path                = "/api/health"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  # How long to keep draining in-flight requests to a task being removed. Short = faster deploys.
  deregistration_delay = 30
}

# --- TLS certificate (ACM) -----------------------------------------------------------------
# ACM issues a free cert for api.mimi.daeseon.ai, validated by DNS. Because your DNS is on
# Cloudflare (not Route53), Terraform CANNOT create the validation record for you. Instead it
# OUTPUTS the record (see outputs.tf `acm_validation_record`); you add that CNAME in Cloudflare,
# ACM auto-issues within minutes, and the listener below starts serving a valid cert.
resource "aws_acm_certificate" "api" {
  domain_name       = var.api_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# --- Listeners -----------------------------------------------------------------------------
# Port 80: behavior depends on the phase (see var.enable_https).
#   phase 1 (false): forward straight to the app, so you can test over http://<alb-dns>.
#   phase 2 (true):  redirect to HTTPS once the cert is issued.
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = var.enable_https ? "redirect" : "forward"
    target_group_arn = var.enable_https ? null : aws_lb_target_group.backend.arn

    dynamic "redirect" {
      for_each = var.enable_https ? [1] : []
      content {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
  }
}

# Port 443: only created in phase 2, AFTER the ACM cert has ISSUED (AWS rejects an un-issued
# cert on a listener, which is why this is gated behind enable_https).
resource "aws_lb_listener" "https" {
  count             = var.enable_https ? 1 : 0
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06" # modern TLS 1.2/1.3 policy
  certificate_arn   = aws_acm_certificate.api.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}
