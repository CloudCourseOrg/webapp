#!/bin/bash

sudo yum update -y

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

sudo yum install mariadb mariadb-server -y

export DATABASEUSER=${mysql_USER}
export DATABASEPASSWORD=${mysql_PASSWORD}
export DATABASE=${mysql_DB}
export PORT=${mysql_PORT}
export DATABASEHOST=${mysql_HOST}

sudo systemctl start mariadb
sudo mysqladmin -u ${mysql_USER} password ${mysql_PASSWORD}
mysqladmin -u ${mysql_USER} --password=${mysql_PASSWORD} --host=${mysql_HOST} --port=${mysql_PORT} create ${mysql_DB}
sudo systemctl enable mariadb

# Connect to the MySQL server and create the new user
# mysql --user="${mysql_USER}" --password="${mysql_PASSWORD}" "${mysql_DB}" <<EOF
# CREATE USER "${mysql_USER}" IDENTIFIED BY "${mysql_PASSWORD}";
# EOF

# mysql --user="${mysql_USER}" --password="${mysql_PASSWORD}" "${mysql_DB}" <<EOF
# GRANT ALL PRIVILEGES ON *.* TO "${mysql_USER}";
# FLUSH PRIVILEGES;
# EOF

unzip webapp.zip
cd /home/ec2-user/webapp
npm i

#Giving exec writes to owner, user and group
# chmod -R 755 node_modules/
# rm -rf node_modules/
# npm i

sudo ./webapp.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable webapp.service
# sudo systemctl start webapp.service



# Install nginx
# sudo amazon-linux-extras list | grep nginx
# sudo amazon-linux-extras enable nginx1
# sudo yum clean metadata
# sudo yum -y install nginx
# sudo systemctl enable nginx
# sudo cp packer/nginx.conf /etc/nginx/
# sudo systemctl restart nginx
# sudo systemctl reload nginx