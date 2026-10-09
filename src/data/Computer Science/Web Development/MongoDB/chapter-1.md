# Database & DBMS Fundamentals

## Database and DBMS Fundamentals

Basic file systems can store data, but a database organizes it in a structured way. This makes data efficient to query, manipulate, and analyze, even for millions of users.

MongoDB is not only a database; it is a **Database Management System (DBMS)**. It provides the engine for structuring, indexing, and retrieving data.

## The True Meaning of NoSQL

A common misconception is that NoSQL means “No SQL.” It actually means **Not Only SQL**. You are not limited to rigid relational structures.

MongoDB allows flexible schemas. You can keep a strict structure when it suits your needs, or add fields later—for example, adding a `dateOfBirth` field—without redesigning the entire database.

## SQL and MongoDB Terminology

| SQL (relational) | MongoDB | Meaning |
| --- | --- | --- |
| Table | Collection | A group of related records, such as users. |
| Row | Document | One record representing an entity, such as a user. |
| Column | Field | An attribute stored as a key-value pair, such as a name or age. |

## Structuring Data with JSON

A MongoDB database contains collections, and collections contain documents. Data is commonly represented in **JSON (JavaScript Object Notation)** when it is written, sent, and viewed by an application.

MongoDB can represent related data through nesting:

- **Arrays** hold multiple values, such as `previousCompanies: ["Uber", "Mahindra", "Amazon"]`.
- **Arrays of objects** hold related records with multiple properties. For example, an `orderedProducts` array could contain `{ product: "Shoe", price: 20000 }` and `{ product: "T-shirt", price: 5000 }`.

## The Internal Engine: BSON

Although applications commonly work with JSON, MongoDB stores documents using **BSON (Binary JSON)**.

### Why BSON?

JSON is designed to be readable by people. BSON represents documents in a binary format that MongoDB can process, and it supports data types beyond JSON’s basic types.

### Data lifecycle

1. A Node.js or Express application sends a JSON payload to MongoDB.
2. MongoDB converts the document to BSON for storage.
3. When the application queries the data, MongoDB retrieves the BSON document and returns data in a form the application can use.

This conversion is handled by MongoDB and its drivers behind the scenes.
