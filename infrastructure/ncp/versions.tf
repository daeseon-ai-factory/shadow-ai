terraform {
  required_version = ">= 1.0"

  required_providers {
    ncloud = {
      source  = "NaverCloudPlatform/ncloud"
      version = "~> 4.0" # resolved v4.0.5 at first init
    }
  }
}
