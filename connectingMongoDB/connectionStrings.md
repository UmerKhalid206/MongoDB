# Using MongoDB Connection strings

The mongoDB connection string allows us to connect to our cluster and work with our data, it describes a host that we'll be using and the options for connecting to a mongoDB database

For example 

The connection string can be used to connect from mongoDB shell, MongoDB Compass, or any other application


# Formats of MongoDB connection string

- a standard format
- a DNS seed list format

# 1- Standard Format:

    It is used to connect to standalone clusters, replica sets, or sharded clusters

# 2- DNS seed list format:
    It was released in MongoDB 3.6
    It allows us to provide a DNS server list to our connection stream. This gives us a lot more flexibility with our deployment and the ability to change servers in our rotation without re-configuring any of our clients


# Components of Connection String

mongodb+srv://myAtlasDBUser:<db_password>@myatlasclusteredu.a5i5x.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU

# Explanation of mongoDB connection string

# [mongodb] word in string: 

- it begins with mongodb prefix that identifies it as a MongoDB connection String
- The connection string from the atlas dashboard uses a DNS seed list entry, which
  has a list of hosts behind it that we can connect to.

# [srv] word in string:
- The srv edition automatically sets the TLS security option to true and tells mongoDB to use the DNS seed list

# myAtlasDBUser:<db_password>
- It contains the username and password of the database

# @myatlasclusteredu.a5i5x.mongodb.net/
- myatlasclusteredu => cluster name
- then it is the host and the optional port number to our database, if the port number is not specified MongoDB will default to port 27017 

# ?retryWrites=true&w=majority&appName=myAtlasClusterEDU

The final piece of the connection string contains any options that we want to include such as 
* connection timeout,
* TLS and SSL, 
* connection polling,
* read and write concerns

In the above connection string "retryWrites" is set to true, which tells mongoDB drivers to automatically retry when certain types of write operations fail.

MongoDB has options for just about anything that you need when it comes to connecting to a database 