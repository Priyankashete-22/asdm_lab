# base image (mysql) used to create my image
FROM mysql:5.7

#set the root pass to root
ENV MYSQL_ROOT_PASSWORD "manager"

#create a database names ecommercedb
ENV MYSQL_DATABASE "ecommercedb"

# copy file named db.sql from my machine to
# /docker-entrypoint-initdb.d of container
COPY ./db.js /docker-entrypoint-initdb.d/

# expose the port 3306 from container
EXPOSE 3306