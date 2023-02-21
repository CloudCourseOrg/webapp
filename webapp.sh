#!/bin/bash

sudo yum update -y

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo yum install -y nodejs

sudo yum install mariadb mariadb-server -y
sudo systemctl start mariadb
sudo mysqladmin -u root password "password"
mysqladmin -u root --password=password --host=localhost --port=3306 create cloud_web
sudo systemctl enable mariadb

unzip webapp.zip
cd webapp
npm I
DBHOST=localhost DBUSER=root DBPASS=password DATABASE=cloud_web PORT=3000 npm start