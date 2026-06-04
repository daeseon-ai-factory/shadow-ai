# ecr.tf — the private Docker registry that holds the backend image.
#
# CI/CD (the GitHub Actions deploy workflow) builds the Spring Boot image and pushes it here;
# ECS then pulls it to run the task. Think of ECR as "Docker Hub, but private and inside your AWS".

resource "aws_ecr_repository" "backend" {
  name                 = var.project
  image_tag_mutability = "MUTABLE" # allows re-pushing :latest

  image_scanning_configuration {
    scan_on_push = true # free vulnerability scan on each push
  }

  # If you ever `terraform destroy`, also delete the images inside (otherwise destroy fails).
  force_delete = true

  tags = { Name = "${var.project}-ecr" }
}

# Lifecycle policy: keep only the last 10 images so old layers don't pile up storage cost.
resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })
}
