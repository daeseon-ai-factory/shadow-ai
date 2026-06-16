# Single Seoul box for the Mimi backend: VPC + public subnet + ACG (firewall) +
# one server with a public IP. The server runs everything (backend + pot-provider
# sidecar + Postgres + Caddy) via docker-compose — see ncp-migration-runbook.md.
# All resource arguments below are from the official ncloud provider docs.

resource "ncloud_vpc" "main" {
  name            = "${var.name_prefix}-vpc"
  ipv4_cidr_block = var.vpc_cidr
}

resource "ncloud_subnet" "main" {
  name           = "${var.name_prefix}-subnet"
  vpc_no         = ncloud_vpc.main.id
  subnet         = var.subnet_cidr
  zone           = var.zone
  network_acl_no = ncloud_vpc.main.default_network_acl_no
  subnet_type    = "PUBLIC"
  usage_type     = "GEN"
}

# Firewall (Access Control Group) + rules: SSH (your IP), HTTP/HTTPS (world).
resource "ncloud_access_control_group" "main" {
  name        = "${var.name_prefix}-acg"
  description = "Mimi backend box"
  vpc_no      = ncloud_vpc.main.id
}

resource "ncloud_access_control_group_rule" "main" {
  access_control_group_no = ncloud_access_control_group.main.id

  inbound {
    protocol    = "TCP"
    ip_block    = var.allowed_ssh_cidr
    port_range  = "22"
    description = "SSH (restrict to your IP)"
  }
  inbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "80"
    description = "HTTP (Caddy ACME challenge)"
  }
  inbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "443"
    description = "HTTPS"
  }
  outbound {
    protocol    = "TCP"
    ip_block    = "0.0.0.0/0"
    port_range  = "1-65535"
    description = "all outbound"
  }
}

# SSH login key — Terraform generates it; export the private key from outputs.
resource "ncloud_login_key" "main" {
  key_name = "${var.name_prefix}-key"
}

# NIC carrying our custom ACG; attached to the server as its primary interface.
resource "ncloud_network_interface" "main" {
  name                  = "${var.name_prefix}-nic"
  subnet_no             = ncloud_subnet.main.id
  access_control_groups = [ncloud_access_control_group.main.id]
}

resource "ncloud_server" "backend" {
  subnet_no           = ncloud_subnet.main.id
  name                = "${var.name_prefix}-backend"
  server_image_number = var.server_image_number # ← from console (see variables.tf)
  server_spec_code    = var.server_spec_code     # ← from console
  login_key_name      = ncloud_login_key.main.key_name

  network_interface {
    network_interface_no = ncloud_network_interface.main.id
    order                = 0 # primary
  }
}

resource "ncloud_public_ip" "main" {
  server_instance_no = ncloud_server.backend.id
  description        = "${var.name_prefix} backend"
}
