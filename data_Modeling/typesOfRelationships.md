# Types of Relationship

- One to One
- One to Many
- Many to Many

# 1- One to One:
    A relationship where a data entity in one set is connected to exactly one data entity in another set.

- Example: This movie has only one director  "George Lucas"

{
    "_id": ObjectId("53fjew98r39n38jc83b920"),
    "title": "Star Wars - A new Hope",
    "director": "George Lucas",
    "runtime": 121
}

# 2- One to Many:
    A relationship where a data entity in one set is connected to any number of data entities in another set.

- Example: There are many cast members in our movie, it also an example of nested array, which is great way to model one-to-many relationships

{
    "_id": ObjectId("53fjew98r39n38jc83b920"),
    "title": "Star Wars - A new Hope",
    "cast": [
        {"actor": "Mark Hamill", "character: "Luke Skywalker"},
        {"actor": "Harison Ford", "character: "Han Solo"},
        {"actor": "Carrie Fisher", "character: "princess Leia Organa"},
    ]
}

# 3- Many-to-Many:
    A relationship where any number of data entities in one set are connected to any number of data entities in another set.


