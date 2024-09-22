const {MongoClient, ObjectId} = require('mongodb')
const uri = require('./atlas-uri')


const client = new MongoClient(uri)


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
        // const databaseList = await client.db('sample_analytics').admin().listDatabases()
        // databaseList.databases.forEach(db => console.log(` - ${db.name}`))
        
    } catch (error) {
        console.error(error);
        
    } 
    
    
}


getDatabases()


//...................................................................

/*
What aggregation is?
    In the context of databases, aggregation is the analysis and summary of 
    data

Aggregation Stage?
    An aggregation stage is an aggregation operation that's performed on the 
    data and does not permanently alter the source data

Aggregation Pipeline:
    A series of stages completed one at a time, in order.
    MongoDB took aggregation stage's concept further by creating an aggregation
    pipeline, in which the developer specifies the aggregation operations one at
    a time in order

    We can run a single aggregation stage to get the information that we need
    But what makes aggregation in MongoDB unique is that we can string together
    aggregation stages to create a pipeline.

    A pipeline consists of multiple stages, where data can be 
    filtered, 
    sorted,
    grouped,
    and transformed.

    Documents that are output from one stage become input into next stage

    In MongoDB atlas, we can use a visual editor to create and test aggregation
    pipelines by adding stages one-by-one. We can see the results from each
    stage.

    This is a great way to get started with aggregation and you may want to 
    use this tool to explore the different stages

    general syntax of aggregation pipeline
    db.collection.aggregate([
    {
        $stage1: {
            { expression1 },
            { expression2 }...
        },
        $stage2: {
            { expression1 }...
        }
    }
])

    aggregate function takes an array of aggregation stages to form the pipeline

*/  

/*
Stages of aggregation:
    Each stage is a single operation on the data.
    some of the commonly used stages are 

    $match: filters for data that matches certain criteria.

    $group: Groups documents based on criteria

    $sort: puts the documents in a specified order

    $limit:
    $project: 

    $set:

    much more

    These operations are useful both individually and together in a pipeline for
    analyzing the data.
    Each stage includes the syntax to carry out the operation, the syntax for
    each stage is dependent on the stage

    The syntax for some stages may includes expressions, 
    for example: the match stage expects the same syntax as the MongoDB find
    method.

    field path:
    When looking at aggregation syntax You may notice that sometimes field
    names are prefixed with a dollar ($) sign, this is a field path, it allows
    us to refer to the value in that field 

    Example:

    $set: {
        defaultUsername: {
        $concat: ["$first_name", "$last_name"]
        }
    }

    in this example, we are setting a new field called defaultUsername to a 
    concatenated string composed of the values from the first name field and the
    last name field
*/

//.....................................................................


/* $match: 
    would be using $match to Filter for documents that satisfy a query.
    The match stage filters for documents that meet specified conditions and
    passes those documents to the next stage of the pipeline

    syntax: 
    db.zips.aggregate([
    {$match: {"state": "CA"}}
    ])

    The match stage takes one argument, which is a query, this query works 
    exactly like a find command.

    When using a $match stage, place it early as possible in the pipeline, 
    so it can use indexes, because it filters, it reduces the number of documents,
    which lessens the amount of processing required 

   $group: 
   would be using $group to group documents by a group key, it creates a single
   document for each distinct value that we grouped by

*/

//$match stage example: to find all of the zip codes from california

// client.db('sample_training').collection('zips')
// .aggregate([
//     {$match: {"state": "CA"}}
// ])
// .toArray().then((res) => console.log(res))

/*now if we wanted to group all of those zip codes by city? for that need to 
add group aggregation stage

The group stage groups documents according to a group key,
The output of this stage is one document for each unique value of the group
key 

General syntax:
{
    $group:{
        _id: <expression>, //group key
        <field>: {<accumulator>: <expression>}
    }
}



The group stage requires us to specify an underscore _id which would be the
group key, this is the field that we'll group by

The group stage may also include one or more fields with an accumulator,
An accumulator is an expression that specifies how to aggregate information 
for each of the groups 

Example:
{
    $group:{
        _id: "$city", //group key
        totalZips: {$count: { }}
    }
}

In example we are setting our group key to the city field, then we will use 
count as an accumulator to find how many zip codes are in each city

*/

//$match and $group together

// client.db('sample_training').collection('zips')
// .aggregate([
//     {$match: 
//         {"state": "CA"}
//     },   //$match would pass its results to next stage
    
//     {
//         $group:{
//             _id: "$city",
//             /*_id: "$city", means that 
//             all the documents that have the same value for the city field. 
//             So, all documents with the same city name are considered part of the
//             same group 
//             For each group, the result will have a unique _id corresponding to 
//             that city name

//             Example:
//             If your collection had the following documents:

//             { "city": "Los Angeles", "state": "CA", "zip": "90001" }
//             { "city": "Los Angeles", "state": "CA", "zip": "90002" }
//             { "city": "San Francisco", "state": "CA", "zip": "94103" }
//             { "city": "Los Angeles", "state": "CA", "zip": "90003" }
//             { "city": "San Francisco", "state": "CA", "zip": "94104" }

//             Using _id: "$city" in the $group stage would produce two groups:

//             1- A group where _id is "Los Angeles", containing all documents with city: "Los Angeles".
//             2- A group where _id is "San Francisco", containing all documents with city: "San Francisco".
//             */ 

//             totalZips: {$count: {}}
//             /*The totalZips field is created for each group during the aggregation.
//             It will store the count of documents in each group. Each group represents
//             a city (since we are grouping by "$city"), and the $count operator will 
//             count how many documents (or zip codes) belong to each city. 

//             Grouping by City (_id: "$city"): The aggregation groups all documents with 
//             the same city name into one group.

//             totalZips: { $count: {} }: The $count operator then counts the number
//             of documents in each group (i.e., how many documents have the same city 
//             value).

//             The totalZips field is created to store that count for each group.
//             */
//         }
//     }

    
// ]).toArray()
// .then((res) => console.log(res))


//another example

// client.db('sample_training').collection('zips')
// .aggregate([
//     { $match: { "state": "CA" } },  // Filter by state "CA"
//     { 
//         $group: {
//             _id: "$city",             // Group by city
//             totalZips: { $count: {} },   // Count the number of documents in each group
//             zips: { $push: "$zip" }   // Push all zip codes in the group into an array
//         }
//     }
// ]).toArray()
// .then((res) => console.log(res))


//.............................................................

/* $sort and $limit stages can be combined together to quickly find the documents
    with the top or bottom values in a dataset
    
    
$sort: 
    A sort stage sorts all input documents and passes them through pipeline in sorted 
    order, this can be: 
    - a numeric value,
    - strings that can be arranged in alphabetical order, 
    - dates or timestamps,

    when entering the field to sort by we use 1 to indicate a sort in ascending order,
    and we use -1 to indicate sort in descending order
*/

/* Example of $sort: suppose we want to sort documents according to highest population
    to lowest then
*/

// client.db('sample_training').collection('zips')
// .aggregate([
//     {$sort: {
//         pop: -1   //show document with highest population first
//     }},
//     {$limit: 3} //limit the number of documents that are passed on to next aggregation stage
// ]).toArray()
// .then((res) => console.log(res))

//Note: In aggregation order of the stages matters a lot


//................................................

/*Another example of $sort + limit
 You have a database called bird_data with a collection of sightings. We want to use this data to find the birds that are sighted furthest North.
 Use the sightings collection in this lab.

Create an aggregation pipeline. (Forgot the command or aggregation stages? Check the hint below!)

Use a $sort stage to sort the data from North to South. To do this, use location.coordinates.1, noting the schema is { location: { coordinates: [x, y] } }, where the highest latitude value is the furthest North. The y in the schema represents latitude.

Use a $limit stage to limit the number of documents so that you're shown the top 4 documents.

Run your aggregation pipeline, and find out which birds have been sighted way up North!


*/

//this database is not available in my atlas
// db.sightings.aggregate([{$sort: {"location.coordinates.1": -1}}, {$limit: 4}])


//....................................................................


/* $project stage:
    The project stage determines the output document shape, it allows us to specify
    the existing or new fields that will be returned by the aggregation, 
    this stage performs a projection similar to the one we apply in find() operations
    It should usually be the last stage because it specifies the exact fields in the 
    output.

    MongoDB already works out which fields are needed and reads, only the fields that
    are required in the pipeline, so there's usually no reason to use project earlier 
    in the pipeline

    projection can be specified as either inclusion or exclusion. In the $project
    stage, either include the fields you would like to keep by setting the value to
    1, or set the value to 0 if you are specifying the fields you want to exclude,
    
    if the projected fields are new fields, we can specify the value that we want 
    to assign to them, you can also specify a new value to existing fields in project



*/

// client.db('sample_training').collection('zips')
// .aggregate([
//     {$project: {
//         state: 1,   //including state from response
//         zip:1,      //including zip from response
//         population: "$pop", //adding a new field that would have value of pop field from response
//         _id: 0  //excluding _id from response
//     }},
//     {
//         $limit: 10
//     }
// ]).toArray()
// .then((res) => console.log(res))

/* output 
{ zip: '35014', state: 'AL', population: 3062 } //and 9 more
*/


//............................................................

/* $set stage:
    Rather than specifying output like project, the set stage adds or modifies fields
    in the pipeline,
    This is useful when we want to change existing fields in pipeline or add new ones
    to be used in upcoming pipeline stages, without having to specify all the existing
    fields

    the $set stage takes the field names and values that we want to add or change

    general syntax of $set 

    $set:{
        <field>: <value>,
        <field>: <value>,
        ....
        
        <field>: <value>,
    }
*/

/*
Example:
    Let's add a field to show the projected population in the next year based on 
    average population growth in each zip code 

    In the zips collection, we apply a set stage to create a new field called pop_2022
    this will be the current population plus the US population growth rate from 2021,
    .31%, which would be written as 1.0031 multiplied by the original population value
    and rounded to the nearest whole number because we are referencing people
*/


// client.db('sample_training').collection('zips')
// .aggregate([
//     {$set: {
//         pop_2022: {$round: {$multiply: [1.0031, "$pop"]}}
//     }},
//     {
//         $limit: 20
//     }
// ]).toArray()
// .then((res) => console.log(res))

//.............................................................................

/* $count 
    Counts documents in the pipeline 
    Returns the total document count 

    The $count stage receives a string that represents the new fields that's returned 
    with the total document count    
*/

// Example

// client.db('sample_training').collection('zips')
// .aggregate([
//     {$count: "total_zips"} //we used total_zips as the count field name
// ]).toArray()
// .then((res) => console.log(res))

/* Output => [ { total_zips: 29470 } ]

The value is actually the total number of documents in the pipeline

*/


//another example; if i want to count the documents in which pop field's value is gte 40000 

// client.db('sample_training').collection('zips')
// .aggregate([
//     { $match: { pop: { $gte: 50000 } } }, // Filter documents where pop >= 40000
//     { $count: "greater50K" }                // Count the matching documents
// ]).toArray()
// .then((res) => console.log(res))