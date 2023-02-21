#!/bin/bash

sudo yum update -y

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

sudo yum install mariadb mariadb-server -y
sudo systemctl start mariadb
sudo mysqladmin -u root password "password"
mysqladmin -u root --password=password --host=localhost --port=3306 create cloud_web
sudo systemctl enable mariadb

cd /home/ec2-user/webapp
npm i

#Giving exec writes to owner, user and group
chmod -R 755 node_modules/
rm -rf node_modules/
npm i

sudo cp packer/webapp.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service



# Install nginx
sudo amazon-linux-extras list | grep nginx
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx
sudo systemctl enable nginx
sudo cp packer/nginx.conf /etc/nginx/
sudo systemctl restart nginx
sudo systemctl reload nginx