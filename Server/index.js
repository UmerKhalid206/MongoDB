const {MongoClient, ObjectId} = require('mongodb')
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
//     _id: 'mdndieoi3029cnieowic',  //if you provide _id yourself then mongoDB would not create its own
//     name: 'ABC',
//     age: 10
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



//...............................................................

// replaceOne() method
/* syntax => db.collection.replaceOne(filter,replacementDocument,optionsObject)
optionsObject is optional */

// Example

// client.db('sample_analyt').collection('users')
// .replaceOne({_id: new ObjectId('66e6b7734391ebf1d5497280')}, {  //would create a new instance of ObjectId class and assign that object value to _id
//     name: 'Umer Khalid jutt',
//     email: 'umer@gmail.com'

// }
// ).then((res) => console.log(res))

//.....................................................................

//findOne method to check after replaceOne that whether data changed or not

// client.db('sample_analyt').collection('users')
// .findOne({_id: new ObjectId('66e6b7734391ebf1d5497280')}, { projection: { name: 1, email: 1, _id: 0 } })
// .then((res) => console.log(res))

//..................................................................

//UpdateOne() method

/*
Syntax: 
    db.collection.updateOne(
    <filter document>,
    <update document>,
    {options object}    //optional
    )

    updateOne method also have operators
    $set 
    $push

    1- $set operator: 
        $set operator does one of two things
        - Add new fields and values to a document   (OR)
        - Replaces the value of a field with a specified value

    2- upsert Option:
        Insert a document with provided information if matching documents
        don't exist, upsert is shortcut for update and insert    

    3- $push operator:
       $push operator does one of two things
       - Appends a value to an array   (OR) 
       - if the field is absent $push adds the array field with the value as its
       element
*/      

// $set operator Example

// client.db('sample_analyt').collection('users')
// .updateOne({_id: new ObjectId('66e6b7734391ebf1d5497280')}, 
//     {$set : {city: 'Samundri'}}  //set would add a new field and value to document
// ).then((res) => console.log(res))

//.....................................................
// upsert option in updateOne

/* what if updateOne could not find a document and we have a scenario that if 
document _id is matched then update that document with provided fields and their 
values but if filter does not find any document on the condition provided in first
argument of updateOne and we can also insert a new document with the fields provided
in updateOne
*/

//Example of upsert

// client.db('sample_analyt').collection('users')
// .updateOne({name: 'Saqib Mahmood'},    //check if a document containing name: 'Saqib Mahmood' exist
//     {$set: {email: 'saqib@gmail.com'}},  //if found set its email with value 'saqib@gmail.com'
//     {upsert: true} //if not found then create a new document with given name + email
// ).then((res) => console.log(res))

//...............................................................

// $push operator 
/*suppose we have a document that contains an array and we want to add, value in
that array or even if array is empty push a value to it*/

// client.db('sample_analyt').collection('users')
// .updateOne({email: 'saqib@gmail.com'},   //find document with field + value
//     {$push: {address: 'Saudia'}}   //if address field not available create a new array and add address: 'Saudia' to it, otherwise  => push address:'saudia' if address array exists
// ).then((res) => console.log(res))


//.......................................................

// $pull operator is used to delete value from array even if present in center
// client.db('sample_analyt').collection('users')
// .updateOne({email: 'saqib@gmail.com'},  
//     {$pull: {address: 'Faisalabad'}}   //it would remove 'Faislabad' from address array even if it is in center 
// ).then((res) => console.log(res))

//$pop operator is used to delete value from array from start or end of array


//.........................................................................

// findAndModify() method  deprecated
/*
findAndModify() method returns the document that has just been updated
Explanation: 
Suppose we have app that keeps track of how many users downlaod an app and
when a user downloads that app we have to update that field in database so we used 
updateOne() which would return only the modified count related information and then 
we want to show the updated downloads count, and for that count we would call findOne
method to check the new count after recent update, 
in that scenario we have two drawbacks
1- calling updateOne and then findOne() means 2 roundtrips to mongoDB server
2- may be another user downloads that app and count is again updated before the 
   findOne method's round trip to mongoDB server that means first user would find
   wrong information

to avoid those two problems we have findAndModify() method because it would update
the document and also return changed document as whole, without return the modified
count
*/


/*Example: we would have a scenario how many profile visits are their on a users
profile*/

// client.db('sample_analyt').collection('users')
// .findOneAndUpdate(
//     {_id: new ObjectId('66e6b7734391ebf1d5497280')},
//     { $inc: { profileView: 1 } },  // Increment 'profileView' by 1 (creates it if not exists)
//     {returnDocument: 'after', upsert: true}  // Return updated document, create if not found
//     //returnDocument: 'after' would return the document after it is updated
// ).then((res)=> console.log(res))

/*in above example if profileView found already inc by 1, if not found create 
profileView and assign 1 to it, it would only do so if upsert is set to true */


//.......................................................

/*updateMany() method
  it is used to update multiple documents in a single mongoDB collection
  updateMany() method accepts
  - filter document
  - update document
  - Options object
 */

//Example
//if users age >= 23 or class_id:550 then set a field graduated: true or [update field if exist]

// client.db('sample_analytics').collection('users')
// .updateMany(
//     {$or: [{age: {$gte: 23}}, {class_id: 550}]},  //if age > 23 or class_id:550 select them
//     {$set: {"graduated": true}},   //if selected then set their graduated field to true
// ).then((res) => console.log(res))

//drawbacks or points to remember about updateMany
/*
- updateMany() method is Not an all-or-nothing operation which means
  of you give command to update documents, and total matched documents were 1000
  in the mean time updateMany operation stops after changing only 200/1000 documents
  then it will not roll back updates that means only 200 would be updated and rest 
  800 are still pending, and at that point 200 are different from rest 800, then
  you have to run again updateMany
  
- updateMany also lacks isolation, which means that updates will be visible as soon
  as they are performed,
  
for those reasons updateMany is not appropriate for some use cases that may be 
essential for business requirements, such as financial transactions 
*/


//to update documents who have same field but different values
// client.db('sample_analyt').collection('users')
// .updateMany(
//     {"name": {$in: ["Umer Khalid jutt", "Saqib Mahmood"]}},  
//     {$set: {"last_met": new Date('2024-06-30')}}
// ).then((res)=> console.log(res))

//............................................................

// deleteOne()

//inserted a new document to make duplicate of Umer named document then delete it
// client.db('sample_analytics').collection('users')
// .insertOne({name: 'Umer', age: 23, graduated: true})
// .then((res)=> console.log(res))

// client.db('sample_analytics').collection('users')
// .find({name: 'Umer'}).toArray().then((res)=> console.log(res))
/* if document with name 'Umer' is more than one means duplicate then delete one
from them*/

// client.db('sample_analytics').collection('users')
// .deleteOne({_id: new ObjectId('66e6a8cf171bd1bff58ef1f1')})
// .then((res)=> console.log(res))

//...............................................................

//deleteMany()

// client.db('sample_analytics').collection('users')
// .deleteMany({"graduated": false})
// .then((res)=> console.log(res))


//...........................................................

// Modifiying query results
/* 
- Return the result of a query in a specified order
- Limit the number of documents in a result

to achieve above two things we would use two cursor methods
- cursor.sort()
- cursor.limit()

=> Cursor:
    A cursor is a pointer to the result set of a query, 
    the db.collection.find() method returns a cursor and points to the documents
    that match that query

    Cursor methods which are chained to queries can then be used to perform actions
    on the resulting set, e.g; sorting and limiting the number of search results
    before returning the desired data or information to the client
*/

//sort method
/*
suppose we want to sort music companies according to their name in ascending order

*/
// client.db('sample_training').collection('companies')
// .find(
//     {'category_code': 'music'}, 
//     {projection: {name: 1}} //projection would only show name field of found document
// ).sort({name: 1})  /*if name: 1 => ascending (OR) name:-1 => descending order also
//     sort would sort capital Alphabet first and then lowercase alphabet, but you can 
//     change this behaviour in sort methods options
// */
// .toArray().then((res)=> console.log(res))

//......................................................................

//limit method:
/*
limiting the number of results can enhance performance of an app by avoiding 
unnecessary data processing 
*/

/*
Suppose we want to find top 3 music companies with highest number of employees

*/

// client.db('sample_training').collection('companies')
// .find(
//     {"category_code": "music"},
//     {projection: {name: 1, number_of_employees: 1}}
// ).sort({number_of_employees: -1})    //descending_sort to have company with highest number_of_employees at top
// .limit(3)
// .toArray().then((res)=> console.log(res))

//...................................................

/*=> projection:
 it is used to return specific fields from whole document, mostly used in find
 methods of mongoDB
 by projection if you eliminate some fields than it would be a less burden on your 
 bandwidth 
*/



// client.db('sample_training').collection('inspections')
// .find(
//     {sector: "Mobile Food Vendor - 881"},
//     {projection: {business_name: 1, result: 1, _id: 0}}  //only show business_name + result in return
// ).toArray().then((res) => console.log(res))

/*
Note: 
    In projection inclusion and exlusion can't be combined in projections 
    except _id field
*/


//.....................................................

//Another example
//we want to have documents whose result is either pass or a warning

// client.db('sample_training').collection('inspections')
// .find(
//     {result: {$in: ["Pass", "Warning"]}},
//     {projection: {date: 0, "address.zip": 0}}
    
// ).limit(50).toArray().then((res) => console.log(res))


//..................................................

/**
 => counting in mongoDB

 syntax: 
    db.collection.countDocuments(<query>, <options>)
 */

// example

// client.db('sample_training').collection('trips')
// .countDocuments()   //simple count to count entire collections documents
// .then((res)=> console.log(res))


// client.db('sample_training').collection('trips')
// //countDocuments which are subscribers + their trip was 120 or more
// .countDocuments({tripduration: {$gte: 120}, usertype: 'Subscriber'})
// .then((res) => console.log(res))

//another example

// Find the number of sales that included a laptop that cost less than $600.
// client.db('sample_supplies').collection('sales')
// .countDocuments({items: {
//     $elemMatch: {name: 'laptop', price: {$lt: 600}}
// }})
// .then((res) => console.log(res))