# Embedding: (Nested documents, means document inside another document) 

it is used when you have one-to-many or many-to-many relationships in data that's being stored

MongoDB recommends embedding documents in order to simplify queries and improve overall query performance

Example: One to many in name + address fields
{
    name: {firstName: "Umer", lastName: "Khalid"},
    Job: "professor",
    Address:{ 
    mailAddress:{
        Street: 402 Maple,
        city: chicago,
        zipCode: 81442
    },
    secondaryAddress:{
        Street: 312 university Blvd,
        city: chicago,
        zipCode: 81445
    },
    emergencyAddress:{
        Name: Kerri Davis, 
        Street: 42 wallbay way,
        city: sydney,
        zipCode: 78 AU,
        country: Australia
    }

    }
}


Embedding avoids application joins and provides better performance for read operations,
Moreover Embedding allows developers to update related data in a single write operation


# Warning (issues because of embedding data modeling)

- Embedding data into a single document can create large documents, which can lead to excessive memory and add latency for reads which may slow your application 

- In embedding you might structure your document in a way that data is added continously without any limit, which creates an unbounded document.

# Unbounded Document

Unbounded Documents may exceed the BSON document threshold of 16 MB

both large and unbounded documents are schema anti pattern, which you should avoid 
