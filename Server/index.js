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
        databaseList.databases.forEach(db => console.log(` - ${db.name}`))
        
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

