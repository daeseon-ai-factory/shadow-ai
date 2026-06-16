output "public_ip" {
  description = "Point api.mimi.daeseon.ai's A record at this."
  value       = ncloud_public_ip.main.public_ip
}

output "ssh_private_key" {
  description = "Save with: terraform output -raw ssh_private_key > mimi-key.pem && chmod 600 mimi-key.pem"
  value       = ncloud_login_key.main.private_key
  sensitive   = true
}
