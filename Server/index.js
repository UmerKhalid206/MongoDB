const {MongoClient} = require('mongodb')
const uri = require('./atlas-uri')


const client = new MongoClient(uri)  //you can also pass options in second parameter

/*
Note: 
1- An application should use a single MongoClient instance for all database requests
to be reused across all database requests
2- This is because creating MongoClients is resource intensive
3- Creating a new MongoClient for each request will affect the application's 
   performance

*/

const connectToDatabase = async() => {
    try {
        await client.connect()
        console.log(`Connected to database`);
        
    } catch (error) {
        console.error(error);
        
    }
}

const getDatabases = async() => {  
    try {
        await connectToDatabase()
        const databaseList = await client.db('sample_analytics').admin().listDatabases()
        // databaseList.databases.forEach(db => console.log(` - ${db.name}`))
        
    } catch (error) {
        console.error(error);
        
    } 
    
    
}


getDatabases()

//.............................................................................
/*
CRUD operations using mongoDB
*/

/*
Note:  Mongoose VS simply accessing mongoDB 

1- Schema Definition and Validation:
MongoDB is schema-less, meaning it does not enforce any structure on documents within a collection.
Mongoose allows you to define schemas for your collections, which makes it easier to enforce structure and validation rules on your data.
With Mongoose, you can define required fields, default values, data types (e.g., String, Number), and custom validation logic.

2- Data Relationships (Object References):
MongoDB doesn’t natively support deep relationships between collections like SQL databases (though you can use manual references or embedded documents).
Mongoose allows for easier management of relationships between documents using ObjectIds to reference documents in other collections. It provides built-in support for population, which enables you to join related data more seamlessly.

3- Middleware (Hooks)
Mongoose provides middleware (or hooks) that allows you to perform actions before or after certain database operations (e.g., save, remove, update). This is very useful for things like logging, authentication, data validation, or triggering other actions in the lifecycle of your data.
MongoDB driver doesn’t provide this functionality out of the box

Much more than these 3 points
*/

// insertOne()
/*
Note: if sample_analytics does not exist then mongoDB would create a database named 
"sample_analytics" automatically and then insert document into it
*/

// client.db('sample_analytics').collection('users').insertOne({
//     name: 'Umer',
//     age: 23
// }).then((res) => console.log('res =>', res))

//...........................................................................
//insertMany()

// const collection = client.db('sample_analytics').collection('users')

// collection.insertMany([
//     {
//       student_id: 1,
//       subjects: [
//         {
//           type: "quiz",
//           score: 50,
//         },
//         {
//           type: "homework",
//           score: 70,
//         },
//         {
//           type: "quiz",
//           score: 66,
//         },
//         {
//           type: "exam",
//           score: 70,
//         },
//       ],
//       class_id: 551,
//     },
//     {
//       student_id: 2,
//       subjects: [
//         {
//           type: "exam",
//           score: 83,
//         },
//         {
//           type: "quiz",
//           score: 59,
//         },
//         {
//           type: "quiz",
//           score: 72,
//         },
//         {
//           type: "quiz",
//           score: 67,
//         },
//       ],
//       class_id: 550,
//     },
//     {
//       student_id: 3,
//       subjects: [
//         {
//           type: "exam",
//           score: 45,
//         },
//         {
//           type: "homework",
//           score: 39,
//         },
//         {
//           type: "quiz",
//           score: 40,
//         },
//         {
//           type: "homework",
//           score: 88,
//         },
//       ],
//       class_id: 551,
//     },
//   ])



//...........................................................................
/*
 find method in mongoDB
 */
// const users = client.db('sample_analytics').collection('users').find()  //it would return all documents from database
// users.toArray().then((arr) => console.log(arr))

/*Note: you have to convert response into array because The find() method in 
MongoDB returns a cursor, not the actual documents
*/

//..........................................................................

/*if we want to find a specific document then
1- {field: {$eq: <value>}}   or
2- {field: <value>}    //it is implicit syntax of eq to shorten the length of query
*/

//example of finding single document

// const users = client.db('sample_analytics').collection('users')
// .find({age: 23}).toArray().then((arr) => console.log(arr))


//.......................................................................

/* using $in operator inside find
The $in operator allows us to select all documents that have a field value equal to
any of the values specified in the array

syntax:

db.<collection>.find({
<field>: {$in:
[<value>, <value2>, .....]
}
})

*/

//exmaple using $in operator

// client.db('sample_analytics').collection('users')
// .find({class_id: {$in: [550, 551]}}).toArray().then((arr) => console.log(arr))  
/*it means find those documents whose class_id is 550 or 551 
*/


//...............................................................

//Comparison operators in MOngoDB
/*

$gt => greater than
$gte => greater than or equal to
$lt => less than
$lte => less than or equal to
// https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
visit this link to know more operators supported by mongoDB

syntax => <field> : {<operator> : <value>}
*/

//this query may take some time because it has to go through a large dataset
// client.db('sample_supplies').collection('sales').find({"items.price": {$gt: 1000}}).toArray()
// .then((arr)=> console.log(arr))

//................................................................................

// $lte 

/*As we know dataset was huge so i limit it to only 100 documents so it would
only return first 100 documents that would fulfil the condition of $gte: 20*/

// client.db('sample_supplies').collection('sales')
// .find({"customer.age": {$gte: 20}}).skip(0).limit(100).toArray()  //The .limit(100) ensures that no more than 100 documents are returned.
// .then((arr)=> console.log(arr))

//............................................................................

//query array in documents

// client.db('sample_analytics').collection('accounts')
// .find({"products": "InvestmentStock"}).limit(50).toArray()
// .then((arr)=> console.log(arr))

/*
in above example find({"products": "InvestmentStock"}) would search for products
that have "InvestmentStock" in products array or even if products is not an array
means products holds only a singular/ scalar value

but we want that search for "InvestmentStock" value but it must be inside an array
of products not a singular value means element of an array then use

$elemMatch

client.db('sample_analytics').collection('accounts')
.find({
    products: {
        $elemMatch: {$eq: "InvestmentStock"}
    }
})

*/

//Example of elemMatch
// client.db('sample_analytics').collection('accounts')
// .find({products: {
//     $elemMatch: {$eq: "InvestmentStock"}
// }})
// .limit(50).toArray()
// .then((arr)=> console.log(arr))


//.....................................................................

/*
you can also use elemMatch for multiple array values
*/

// client.db('sample_supplies').collection('sales')
// .find({items: {    /*find those documents which have items field and then it would 
//     be any array and that array should contain a document with name=> "laptop" and 
//     it should have price greater than 800 plus its quantity should be greater or 
//     equal to one (means match all three conditions) and that query would return all
//     those documents who have an items array that contains further document with 
//     condition => {name: "laptop", price: {$gt: 800}, quantity: {$gte: 1}}*/

//     $elemMatch: {name: "laptop", price: {$gt: 800}, quantity: {$gte: 1}}
// }})
// .limit(2).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))   //more readable form

//............................................................................


//logical operators in MongoDB

/*
$and => db.collection.find({<expression>, <expression>}) //this syntax's comma is similar to $and operation
$or
*/

//Example of $and

// client.db('sample_training').collection('routes')
// .find({// find airline with name Aerocondor and airline with alias 2B and that main document have 0 or more stops
//     $and: [{"airline.name": "Aerocondor"}, {"airline.alias": "2B"}, {"stops": {$gte: 0}}]
// }).limit(2).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))   //more readable form


// you can achieve implicit $and functionality without using $and

// client.db('sample_training').collection('routes')
// .find({// find airline with name Aerocondor and airline with alias 2B and that main document have 0 or more stops
//    "airline.name": "Aerocondor", "airline.alias": "2B", "stops": {$gte: 0}
// }).limit(2).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))


//.....................................................................

// $or operator
// client.db('sample_training').collection('routes')
// .find({ //find those routes documents that contain SEA airport as destination or source airport
//     $or: [{"dst_airport": "SEA"}, {"src_airport": "SEA"}]
// }).limit(25).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))

//...............................................................

//you can also use $and $or operators together

//Example
// client.db('sample_training').collection('routes')
// .find({
//     $and:[
//         {$or:[ //either dst_airport or src_airport should be "SEA"
//             {dst_airport: "SEA"},
//             {src_airport: "SEA"}
//         ]},
//         {$or:[ //either airline.name="American Airlines"  or airplane should be 320
//             {"airline.name": "American Airlines"},
//             {airplane: 320}
//         ]}

//     ]  
//     /*above query would pick a document that must fullfil both the or operators 
//     which would result in $and operation*/
// }).limit(2).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))


//......................................................................

// using two $or operators without $and
//what if we use two $or operators without $and

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

// client.db('sample_training').collection('routes')
// .find({  
//     $or: [{dst_airport: "SEA"}, {src_airport: "SEA"}],
//     $or: [{"airline.name": "American Airlines"}, {airplane: 320}]    
// }).limit(2).toArray()
// .then((arr)=> console.log(JSON.stringify(arr,null, 2)))



