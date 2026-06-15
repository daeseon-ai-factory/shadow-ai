# The 10GB boot disk is too small for the 1.19GB Java image + Postgres + recordings.
# Attach a 50GB data volume; Docker's data-root + swap get moved onto it.
resource "ncloud_block_storage" "data" {
  name               = "${var.name_prefix}-data"
  size               = 50
  server_instance_no = ncloud_server.backend.id
  zone               = var.zone # KVM requires the zone to match the server
  hypervisor_type    = "KVM"    # gen3 server is KVM
  volume_type        = "CB1"    # KVM volume type (FB1/CB1/FB2/CB2)
}

output "data_device_name" {
  value = ncloud_block_storage.data.device_name
}
