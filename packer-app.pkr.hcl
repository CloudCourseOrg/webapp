variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-0dfcb1ef8550277af" # Ubuntu 22.04 LTS
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "vpc_id" {
  type    = string
  default = "	vpc-098e4ef8f142b536e"
}

variable "subnet_id" {
  type    = string
  default = "subnet-012a6abbd30584b72"
}

variable "mysql_USER" {
  type = string
  default = "root"
}

variable "mysql_PASSWORD" {
  type = string
  default = "password"
}


variable "mysql_HOST" {
  type = string
  default = "127.0.0.1"
}

variable "mysql_PORT" {
  type = string
  default = "4005"
}

variable "mysql_DB" {
  type = string
  default = "cloud2"
}
source "amazon-ebs" "app-ami" {
  region          = "${var.aws_region}"
  ami_name        = "ami-11"
  ami_description = "AMI test"
  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"
  vpc_id        = "${var.vpc_id}"
  profile       = "dev"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.app-ami"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "shell" {
    
    script = "./webapp.sh"
    environment_vars = ["mysql_USER=${var.mysql_USER}", "mysql_PASSWORD=${var.mysql_PASSWORD}", "mysql_HOST=${var.mysql_HOST}", "mysql_PORT=${var.mysql_PORT}", "mysql_DB=${var.mysql_DB}"]


  }
}