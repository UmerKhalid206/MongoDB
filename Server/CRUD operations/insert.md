# insertOne()
/*
Note: if sample_analytics does not exist then mongoDB would create a database named 
"sample_analytics" automatically and then insert document into it
*/

# Example
 client.db('sample_analytics').collection('users').insertOne({
     name: 'Umer',
     age: 23
 }).then((res) => console.log('res =>', res))

...........................................................................
# insertMany()

# Example
 const collection = client.db('sample_analytics').collection('users')

 collection.insertMany([
     {
       student_id: 1,
       subjects: [
         {
           type: "quiz",
           score: 50,
         },
         {
           type: "homework",
           score: 70,
         },
         {
           type: "quiz",
           score: 66,
         },
         {
           type: "exam",
           score: 70,
         },
       ],
       class_id: 551,
     },
     {
       student_id: 2,
       subjects: [
         {
           type: "exam",
           score: 83,
         },
         {
           type: "quiz",
           score: 59,
         },
         {
           type: "quiz",
           score: 72,
         },
         {
           type: "quiz",
           score: 67,
         },
       ],
       class_id: 550,
     },
     {
       student_id: 3,
       subjects: [
         {
           type: "exam",
           score: 45,
         },
         {
           type: "homework",
           score: 39,
         },
         {
           type: "quiz",
           score: 40,
         },
         {
           type: "homework",
           score: 88,
         },
       ],
       class_id: 551,
     },
   ])
