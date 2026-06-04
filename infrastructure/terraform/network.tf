# network.tf — the VPC and its subnets.
#
# THE SHAPE (and the cost decision):
#
#        Internet
#           │
#        [ IGW ]                         ← Internet Gateway: the VPC's door to the internet
#           │
#   ┌───────┴────────────────────────────────────┐  VPC 10.0.0.0/16
#   │                                             │
#   │  PUBLIC subnets (AZ-a, AZ-b)                │  ← ALB + Fargate tasks live here.
#   │   route: 0.0.0.0/0 → IGW                    │    Tasks get a PUBLIC IP so they can pull the
#   │                                             │    image from ECR and read Secrets Manager
#   │  PRIVATE subnets (AZ-a, AZ-b)               │    WITHOUT a NAT gateway (~$32/mo saved).
#   │   route: local only (no internet)           │  ← RDS lives here. It never needs the internet.
#   └─────────────────────────────────────────────┘
#
# Normally you'd put app servers in PRIVATE subnets + a NAT gateway for outbound. We skip NAT to
# save money while learning: Fargate in a public subnet with a public IP can reach ECR/Secrets/
# the internet directly. The DB stays private (no public IP, only reachable from the app's SG).

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true # lets instances resolve DNS (e.g. the RDS endpoint hostname)
  enable_dns_hostnames = true # lets RDS get a DNS name instead of just an IP

  tags = { Name = "${var.project}-vpc" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.project}-igw" }
}

# --- Public subnets (one per AZ) -----------------------------------------------------------
resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true # anything launched here gets a public IP by default

  tags = { Name = "${var.project}-public-${count.index}" }
}

# --- Private subnets (one per AZ) ----------------------------------------------------------
# RDS requires a subnet group spanning at least two AZs even if you run single-AZ.
resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = { Name = "${var.project}-private-${count.index}" }
}

# --- Routing -------------------------------------------------------------------------------
# Public route table: send all non-local traffic to the internet gateway.
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = { Name = "${var.project}-public-rt" }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Private route table: NO internet route. The default `local` route (intra-VPC) is implicit,
# which is all RDS needs (the app reaches it over the VPC's private network).
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.project}-private-rt" }
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}
