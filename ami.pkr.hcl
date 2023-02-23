packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type = string
  default = "us-east-1"
}

variable "aws_access_key_id" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "ssh_username" {
  type = string
  default = "ec2-user"
}

variable "subnet_id" {
  type = string
  default = "subnet-029fd78b62934323c"
}

variable "db_password" {
  type = string
  default = "Harshila@123"
}

source "amazon-ebs" "amazon_linux_image" {
  profile = "dev"
  ami_name = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 225"
  ami_users = ["926230493760"]
  ami_regions = [
    var.aws_region
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts = 50
  }

  source_ami_filter {
    filters = {
      name                = "amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name = "/dev/xvda"
    volume_size = 8
    volume_type = "gp2" 
  }

  ssh_username = "${var.ssh_username}"
  subnet_id = "${var.subnet_id}"
  instance_type = "t2.micro"
  region = var.aws_region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

build {
  sources = [
    "source.amazon-ebs.amazon_linux_image"
  ]

  provisioner "file" {
    source = "webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "file" {
    source = "./web.service"
    destination = "/tmp/web.service"
  }

  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1",
      "DB_PASSWORD=${var.db_password}"
    ]
    script = "./customScript.sh"
  }
}