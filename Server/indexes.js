/**
 What are indexes?

    Indexes are special data structures that store a small portion of the collection's
    data in an ordered form that is easy to traverse and search efficiently.

    Indexes point to the document identity and allow you to lookup access and update 
    data faster.

    Indexes are used in MongoDB to improve query performance, they can speed up queries,
    reduce disk I/O, and reduce the resources required for them.

    Indexes also support queries such as equality matches and range-based operations,
    and return sorted results.

    Indexes store data in an ordered form based on the index fields and values sort
    order that are provided when the index is created.

->  Without indexes:  
        Without indexes MongoDB has to read every document in a collection by performing
        a collection scan to check if it matches the query being run, 
        it also needs to sort the results in memory if the query requires a sorted output.
        
->  With indexes:
        When using an index, MongoDB only fetches the documents identified by the index
        based on the query and returns the results faster. If the index includes all the
        information the query wants to retrieve, MongoDB does not need to read the document

->  By Default:
        By default, there is only one inndex created per collection, this default index
        only includes the _id field.

    Every query should use an index, This way you can create additional indexes in your
    collections to cover your data queries.

->  Be-aware that indexes come with a write-performance cost, when we insert new 
    documents in the collection or update the index fields in them, we also need to 
    update the data in the index structure.
    Also, write-performance can degrade if we have too many indexes in a collection,
    so we need to make sure that all the indexes we have are being used. Otherwise,
    we should delete the unnecessary or redundant indexes.
    
 */

// Types of indexes
/* 

->  Most common index types:
  - single-field indexes 
  - compound indexes 

->  Single-field indexes:
    Single field indexes are indexes on one field only. MongoDB creates a single
    field index on the _id field by default, but additional indexes may be needed
    for other fields as well. A single field can also be a multikey index if it 
    operates on an array field.

->  Compound indexes:   
    Compound indexes include more than one field in the index. MongoDB supports compound
    indexes, where a single index structure holds references to multiple fields within 
    a collection's documents. A compound index is created by specifying the fields that 
    the index should reference, followed by the order in which the fields should be 
    sorted. The order of the fields in the index is important because it determines the 
    order in which the documents are returned when querying the collection. A compound 
    index can also be a multikey index if one of the fields is an array.
    
    In both these indexes, the starting fields or index prefix can be used to support
    queries. Both index types can also be multikey indexes, if they operate on an array
    field. Each array entry has a corresponding index entry.


    Example:
        We search for all the customers who are active and have a specific account.

        db.customers.find({active:true, accounts: 276528})

        Index: 
        active, accounts

        In this case we can define an index with the active and accounts fields to 
        improve the performance of these queries. Because the index has two fields
        and one of them is an array field, it's a multikey compound index. Both 
        queries can use this index.

->      Multikey index: 
        A multikey index is an index on an array field. Each element in the array gets 
        an index key, which supports efficient querying against array fields. Both 
        single field and compound indexes can have an array field, so there are both 
        multikey single field indexes and multikey compound indexes.
        
*/