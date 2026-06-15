variable "region" {
  description = "NCP region. KR = Seoul."
  type        = string
  default     = "KR"
}

variable "zone" {
  description = "Availability zone. Seoul has KR-1 / KR-2 — confirm in the console."
  type        = string
  default     = "KR-2"
}

variable "name_prefix" {
  description = "Prefix for all resource names."
  type        = string
  default     = "mimi"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "allowed_ssh_cidr" {
  description = "Your IP for SSH, e.g. 1.2.3.4/32. 0.0.0.0/0 (anyone) is insecure — set your real IP."
  type        = string
  default     = "0.0.0.0/0"
}

# IMPORTANT: these two are environment-specific codes that change over time.
# Do NOT trust a hardcoded guess — look up the current values in the NCP console
# (Server > create flow) or via the provider's data sources, and fill them in
# terraform.tfvars. Leaving them empty will fail `plan` on purpose.
variable "server_image_number" {
  description = "OS image number (e.g. Ubuntu 22.04). Get the real value from the NCP console."
  type        = string
  default     = ""
}

variable "server_spec_code" {
  description = "Server spec code for ~2 vCPU / 4 GB. Get the real code from the NCP console."
  type        = string
  default     = ""
}

# Only used if you enable the managed-DB option (postgresql.tf.optional).
variable "db_password" {
  description = "Managed PostgreSQL password (set via TF_VAR_db_password env, not in a committed file)."
  type        = string
  sensitive   = true
  default     = ""
}
