#!/bin/bash

sudo yum update -y
sudo yum upgrade -y

# export DBHOST=${DBHOST}
# export DBUSER=${DBUSER}
# export DBPASS=${DBPASS}
# export DATABASE=${DATABASE}
# export PORT=${PORT}
# export DBPORT=${DBPORT}

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

# sudo yum install mariadb mariadb-server -y
# sudo systemctl start mariadb
# sudo mysqladmin -u ${DBUSER} password ${DBPASS}
# mysqladmin -u ${DBUSER} --password=${DBPASS} --host=${DBHOST} --port=${DBPORT} create ${DATABASE}
# sudo systemctl enable mariadb

unzip webapp.zip -d webapp
cd /home/ec2-user/webapp
# echo DBHOST=${DBHOST} > .env
# echo DBUSER=${DBUSER} >> .env
# echo DBPASS=${DBPASS} >> .env
# echo DATABASE=${DATABASE} >> .env
# echo PORT=${PORT} >> .env
# echo DBPORT=${DBPORT} >> .env
npm i

#Giving exec writes to owner, user and group
# chmod -R 755 node_modules/
# rm -rf node_modules/
# npm i

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