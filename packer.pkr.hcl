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
  default = "vpc-098e4ef8f142b536e"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0bbabc693fb82b1e0"
}

variable "DBUSER" {
  type = string
  
}

variable "DBPASS" {
  type = string
}


variable "DBHOST" {
  type = string
}

variable "PORT" {
  type = string
}

variable "DBPORT" {
  type = string
}

variable "DATABASE" {
  type = string
}

variable "ami_name" {
  type = string
  default="ami-1"
}

variable "instance_type" {
  type = string
  default="t2.micro"
}

variable "profile" {
  type = string
  default="packer"
}

variable "device_name" {
  type = string
  default="/dev/xvda"
}

variable "volume_size" {
  type = number
  default=8
}

variable "volume_type" {
  type = string
  default="gp2"
}

variable "region" {
  type = list(string)
  default=["us-east-1"]
}

variable "ami_users" {
  type    = list(string)
  default = ["600779742576","921273005274"]
}

source "amazon-ebs" "app-ami" {
  region          = "${var.aws_region}"
  ami_name        = "${var.ami_name}"
  ami_description = "AMI"
  ami_regions = "${var.region}"
  ami_users       =   var.ami_users

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"
  vpc_id = "${var.vpc_id}"
  profile       = "${var.profile}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = var.volume_size
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.app-ami"]
  
  provisioner "file" {
      source = "./webapp.zip"
      destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "shell" {
   
    script = "./webapp.sh"
    environment_vars = ["DBUSER=${var.DBUSER}", "DBPASS=${var.DBPASS}", "DBHOST=${var.DBHOST}", "PORT=${var.PORT}", "DATABASE=${var.DATABASE}", "DBPORT=${var.DBPORT}"]

  }
}
