# Complete MongoDB Setup: Mongo Shell vs. MongoDB Compass

## 1. Core Components of MongoDB

Before building applications, understand the different parts of the MongoDB ecosystem:

- **MongoDB server (`mongod`):** The database engine that runs in the background. It stores data, handles queries, and manages databases. Clients cannot interact with the local server while its service is stopped.
- **MongoDB Shell (`mongosh`):** A command-line interface for working with MongoDB. Learning the shell helps build familiarity with the queries and database operations used in application code.
- **MongoDB Compass:** A graphical interface for exploring databases, collections, and documents. It is useful for inspecting data and checking the results of shell commands.

## 2. Downloading and Installing

A local development setup typically uses two tools:

1. **MongoDB Community Server:** Installs the MongoDB server engine. The Windows installer may also offer MongoDB Compass as an installation option.
2. **MongoDB Shell (`mongosh`):** A separate command-line tool that can be installed alongside the server.

## 3. Understanding Connections

### Local and remote databases

A local setup stores data on your machine. A remote setup, such as MongoDB Atlas, stores data on a hosted server and uses a different connection string.

### The default local connection string

MongoDB Shell and Compass can both connect to the local server with:

```text
mongodb://localhost:27017
```

The equivalent loopback address is `mongodb://127.0.0.1:27017`. Both clients connect to the same server, so changes made through one are visible through the other.

## 4. Background Services and Troubleshooting

On Windows, MongoDB can be installed as a background service. From an elevated Command Prompt, the service can be controlled with:

```bat
net stop MongoDB
net start MongoDB
```

If the server service is stopped, attempts to connect with `mongosh` or Compass will fail because no local MongoDB server is listening.

## 5. Essential Database Behaviors

### Databases may not appear until they contain data

MongoDB includes system databases such as `admin`, `config`, and `local`. Switching to a new database with `use myDB` selects that database, but it may not appear in `show dbs` or Compass until a collection with data has been created.

### Dropping the last collection

If the only collection in a database is dropped, the database no longer appears in the database list. MongoDB creates and retains databases as data is added to them.

## 6. Basic Shell Commands

```javascript
show dbs
use test
db.users.insertOne({ name: "MKL" })
```

- `show dbs` lists databases that contain data.
- `use test` switches the current shell context to `test`; the database is materialized when data is written.
- `db.users.insertOne({ name: "MKL" })` inserts a document into the `users` collection. If necessary, MongoDB creates the collection and database as part of the write.
