## Prerequisites

1.Visual studio code (IDE)<br/>
2.POSTMAN<br/>
3.Database - MySQL<br/>
4.Node.js<br/>
5. AWS<br/>
6. Terraform<br/>

## Dependencies to be installed .sh file

install node <br/>
sudo yum install -y gcc-c++ make<br/>
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -<br/>
sudo yum install -y nodejs<br/>

#unzip the file<br/>
unzip webapp.zip -d webapp<br/>
cd /home/ec2-user/webapp<br/>
npm i<br/>

sudo cp ./webapp.service /etc/systemd/system/<br/>

sudo systemctl daemon-reload<br/>
sudo systemctl enable webapp.service<br/>
# sudo systemctl start webapp.service



# Install nginx
sudo amazon-linux-extras list | grep nginx<br/>
sudo amazon-linux-extras enable nginx1<br/>
sudo yum clean metadata<br/>
sudo yum -y install nginx<br/>
sudo systemctl enable nginx<br/>
sudo cp nginx.conf /etc/nginx/<br/>
sudo systemctl restart nginx<br/>
sudo systemctl reload nginx<br/>


<h4>Important Commands to run the server and test</h4>


## Endpoints
The following endpoints are available for operations:

GET - https://demo.arpitsamsung.me/v1/user/{id}

POST - https://demo.arpitsamsung.me/v1/user

PUT - https://demo.arpitsamsung.me/v1/user/{id}

GET - https://demo.arpitsamsung.me/v1/user/{id}

GET - https://demo.arpitsamsung.me/v1/product/{id}

POST - https://demo.arpitsamsung.me/v1/product

PUT - https://demo.arpitsamsung.me/v1/product/{id}

GET - https://demo.arpitsamsung.me/v1/product/{id}

PATCH - https://demo.arpitsamsung.me/v1/product/{id}

DELETE - https://demo.arpitsamsung.me/v1/product/{id}


## Responds with following HTTP messages

"200 OK - The request was successful."

"201 Created - A new resource was created as a result of the request, often sent in response to a POST or some PUT requests."

"204 No Content - The request was successful, but there's no need for the client to navigate away from its current page."

"400 Bad Request - The server could not process the request due to an invalid syntax."

"401 Unauthenticated - The client must provide authentication to receive the requested response."

"403 Forbidden - The client does not have access to the requested resource."

"500 Internal Server Error - The server encountered an issue it couldn't handle."


Instructions:

Step 1: Clone the repository or download and unzip the source repository.

Step 2: Create appropriate files in the IDE and write the code to test the API call in Postman.

Step 3: Open Postman to Test the API's

Step 4: Check the Database after each and every API is called to see the status in Database.

Test the api

https://demo.arpitsamsung.me/v1/user, where you should see: "200 OK".

https://demo.arpitsamsung.me/v1/user/{id} where you should see: "201 Created".

https://demo.arpitsamsung.me/v1/user/self/ where you should see: "204 No Content".

https://demo.arpitsamsung.me/v1/user/self where you should use: "204 No Content".

https://demo.arpitsamsung.me/v1/product, where you should see: "200 OK".

https://demo.arpitsamsung.me/v1/product/{id} where you should see: "201 Created".

https://demo.arpitsamsung.me/v1/product/self/ where you should see: "204 No Content".


