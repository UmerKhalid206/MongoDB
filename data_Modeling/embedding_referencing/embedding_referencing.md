# Ways to model Relationships

- Embedding 
- Referencing

# 1- Embedding 
    When we take related data and insert it into our document

-Example: 
{
    "_id": ObjectId("53fjew98r39n38jc83b920"),
    "title": "Star Wars - A new Hope",
    "cast": [
        {"actor": "Mark Hamill", "character: "Luke Skywalker"},
        {"actor": "Harison Ford", "character: "Han Solo"},
        {"actor": "Carrie Fisher", "character: "princess Leia Organa"},
    ]
} 

# 2- Referencing
    We refer to documents in another collection in our document

- Example: 
{
    "_id": ObjectId("53fjew98r39n38jc83b920"),
    "title": "Star Wars - A new Hope",
    "director": "George Lucas",
    "runtime": 121
    "filming_locations": [
        ObjectId("78kdskdueiw9n38flagdewu"),
        ObjectId("3892jdksjdio2i3jc83b920"),
    ]
}

# In general

You should structure your data to match the ways that your apllication queries and updates it

# General principle which modeling the data

Data that is accessed together should be stored together

if you do not store data together, that is accessed together the database would search through multiple collections in order to answer your query, which would have both resource cost and time cost
