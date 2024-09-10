# MongoDB Data Modeling Intro
# - Data Modeling in MongoDB:

Data modeling is the process of defining how data is stored and the relationships
that exist among different entities in your data

We refer to organization of data inside a database as a Schema.

Instead of thinking about database think more about the working and requirement of your application

- What does my application do
- What data will I store
- How will users access this data
- What data will be most valuable to me


# Purpose of good data model

A good data model can

* Make it easier to manage data 
* Make queries more efficient
* Use Less memory and CPU
* Reduce cost

# Polymorphism in MongoDB

MongoDB implements a flexible document data model means
Documents even those in same collection can have different structures.
Each document in mongodb can be different, which is known as polymorphism

That does not mean mongodb to be schemaless, MongoDB says that their schema is flexible

# Schema of MongoDB

You are encouraged to define a schema
* you can use schema validation
* and you can store any kind of data in MongoDB
* You can even store documents that have other documents that are nested or embedded

This embedded document model enables us to build complex relationships among our data

# Normalizing data

You can Normalize data by using database references, key point is
How you application will use the data rather than how it's stored in database

# Goal of data modeling 

is to Store, query, and use resources optimally
