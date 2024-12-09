# Use the official MySQL image as the base
FROM mysql:latest

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=123

# Expose the MySQL port
EXPOSE 3306

# Initialize the database and set the root password
RUN mysql_install_db --user=mysql --datadir=/var/lib/mysql --basedir=/usr/local/mysql --initialize-insecure

RUN apt-get update && apt-get install -y mysql-client
FROM debian:latest
RUN apt-get update && apt-get install -y default-mysql-client