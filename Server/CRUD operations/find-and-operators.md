# find method in mongoDB

 const users = client.db('sample_analytics').collection('users').find()  //it would return all documents from database
 users.toArray().then((arr) => console.log(arr))

/*Note: you have to convert response into array because The find() method in 
MongoDB returns a cursor, not the actual documents
*/

<!-- ...................................................................... -->


# Operators used within find Method
# 1- $eq: 
if we want to find a specific document then
1- {field: {$eq: <value>}}   or
2- {field: <value>}

<!-- ...................................................................... -->
# 2- $in:
The $in operator allows us to select all documents that have a field value equal to
any of the values specified in the array

- syntax:

db.<collection>.find({
<field>: {$in:
[<value>, <value2>, .....]
}
})

<!-- ...................................................................... -->

# 3- Comparison operators in MongoDB
$gt => greater than
$gte => greater than or equal to
$lt => less than
$lte => less than or equal to

// https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
visit this link to know more operators supported by mongoDB

syntax => <field> : {<operator> : <value>}

# 4- $elemMatch
we want that search for "InvestmentStock" value but it must be inside an array
of products not a singular value means element of an array then use

- Syntax
client.db('sample_analytics').collection('accounts')
.find({
    products: {
        $elemMatch: {$eq: "InvestmentStock"}
    }
})

# 5- elemMatch for multiple array values
 client.db('sample_supplies').collection('sales')
 .find({items: {    /*find those documents which have items field and then it would 
     be any array and that array should contain a document with name=> "laptop" and 
     it should have price greater than 800 plus its quantity should be greater or 
     equal to one (means match all three conditions) and that query would return all
     those documents who have an items array that contains further document with 
     condition => {name: "laptop", price: {$gt: 800}, quantity: {$gte: 1}}*/

     $elemMatch: {name: "laptop", price: {$gt: 800}, quantity: {$gte: 1}}
 }})
 .limit(2).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))   //more readable form

# 6- logical operators in MongoDB

# i- $and:

db.collection.find({<expression>, <expression>}) //this syntax's comma is similar to $and operation


 client.db('sample_training').collection('routes')
 .find({  /* find airline with name Aerocondor and airline with alias 2B and that main document have 0 or more stops*/
     $and: [{"airline.name": "Aerocondor"}, {"airline.alias": "2B"}, {"stops": {$gte: 0}}]
 }).limit(2).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))   //more readable form

# implicitly $and operation

 you can achieve implicit $and functionality without using $and

# Example of implicit $and 
 client.db('sample_training').collection('routes')
 .find({ /*find airline with name Aerocondor and airline with alias 2B and that main document have 0 or more stops*/
    "airline.name": "Aerocondor", "airline.alias": "2B", "stops": {$gte: 0}
 }).limit(2).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))

# ii- $or

 client.db('sample_training').collection('routes')
 .find({ /*find those routes documents that contain SEA airport as destination or source airport*/
     $or: [{"dst_airport": "SEA"}, {"src_airport": "SEA"}]
 }).limit(25).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))

# $and $or operators together

- Example
 client.db('sample_training').collection('routes')
 .find({
     $and:[
         {$or:[ //either dst_airport or src_airport should be "SEA"
             {dst_airport: "SEA"},
             {src_airport: "SEA"}
         ]},
         {$or:[ //either airline.name="American Airlines"  or airplane should be 320
             {"airline.name": "American Airlines"},
             {airplane: 320}
         ]}

     ]  
     /*above query would pick a document that must fullfil both the or operators 
     which would result in $and operation*/
 }).limit(2).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))


#  using two $or operators without $and
what if we use two $or operators without $and

/*it would not produce expected results because in the output you can check
it does not get the document with source or destination airport to be "SEA"
and the reason for that is: 
Our first $or expression, the incoming and outgoing flights was overwritten by
the subsequent $or expression which includes airline name or airplane,

this happened because we can't store two fields with same name in the same JSON
object 

As a general rule, when including the same operator more than once in your query,
you need to use the explicit $and operator
*/

- Example
 client.db('sample_training').collection('routes')
 .find({  
     $or: [{dst_airport: "SEA"}, {src_airport: "SEA"}],
     $or: [{"airline.name": "American Airlines"}, {airplane: 320}]    
 }).limit(2).toArray()
 .then((arr)=> console.log(JSON.stringify(arr,null, 2)))
