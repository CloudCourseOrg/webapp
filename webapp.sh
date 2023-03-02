#!/bin/bash

sudo yum update -y
sudo yum upgrade -y


sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs


unzip webapp.zip -d webapp
cd /home/ec2-user/webapp

npm i

sudo cp ./webapp.service /etc/systemd/system/

# Install nginx
sudo amazon-linux-extras list | grep nginx
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx
sudo systemctl enable nginx
sudo cp nginx.conf /etc/nginx/
sudo systemctl restart nginx
sudo systemctl reload nginx