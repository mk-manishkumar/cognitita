# Complete Backend Crash Course Notes (MERN Stack)

## 1. Core Concepts: JavaScript vs. Node.js vs. Express.js

* **JavaScript:** A programming language primarily designed to run in the browser.
* **Node.js:** A runtime environment that allows you to execute JavaScript on your computer (outside the browser). It enables you to interact with databases, create servers, and handle the file system. It is low-level, meaning it gives you a lot of control but requires writing lengthy, complex code (e.g., manually handling routes and headers using the built-in `http` module).
* **Express.js:** A high-level, human-friendly framework built on top of Node.js. It simplifies server creation, making routing and handling requests/responses much shorter and more readable compared to core Node.js.

## 2. Server Setup & Initialization

### Basic Configuration

1. Initialize your project and install packages:
`npm i express`
2. **ES Modules vs. CommonJS:** By default, Node uses CommonJS (`const express = require('express')`). To use modern ES Modules (`import express from 'express'`), add `"type": "module"` in your `package.json`.
3. **Nodemon:** Install via `npm i nodemon`. This package automatically restarts your server when you save file changes.
* *Nuance:* Add a script in `package.json`: `"dev": "nodemon server.js"`. Run your server using `npm run dev`.



### Creating a Basic Express Server

```javascript
import express from 'express';
const app = express(); // Initializes the Express application

// GET Route
app.get('/', (req, res) => {
    res.send('Hello from the Home Route');
});

// Start listening on a port
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});

```

## 3. Data Flow & The Request-Response Cycle

* **The Cycle:** The frontend sends a **Request** (with or without data) -> The backend API processes the logic -> The backend must return a **Response**.
* **The Infinite Spin:** If the backend receives a request but forgets to return a response (e.g., missing `res.send()`), the frontend (or Postman) will hang and load endlessly until it times out.
* **Crucial Middleware (`express.json`):** When the frontend sends data in JSON format (e.g., during a POST request), Express cannot read it by default. `req.body` will return `undefined`.
* *Solution:* You **must** add `app.use(express.json())` at the top of your server logic. This middleware intercepts the incoming request, converts the JSON string into a readable JavaScript object, and attaches it to `req.body`.



## 4. API Testing with Postman

* **Why Postman?** It allows you to test APIs (GET, POST, PUT, DELETE) independently without needing to build a frontend form or interface first.
* **Postman Desktop Agent:** If you are using the Postman web version to test a local server (`localhost`), the API calls will fail. You must download and run the **Postman Desktop Agent** in the background—it acts as a helper application to allow the web browser to communicate with your local machine.
* **Saving Work:** Save your tested routes in Postman **Collections** so you can reuse them and generate documentation later.

## 5. Database Fundamentals (MongoDB)

* **SQL vs. NoSQL:**
* SQL databases store data in tables (Rows/Columns).
* NoSQL ("Not Only SQL") databases like MongoDB store data in a non-tabular format.


* **MongoDB Hierarchy Structure:**
* **Organization** -> Contains Projects.
* **Project** -> Contains Clusters.
* **Cluster** -> A group of servers. Contains multiple Databases.
* **Database** (e.g., `DB1`) -> Contains Collections.
* **Collection** (e.g., `users`) -> The equivalent of a SQL Table. Contains Documents.
* **Document** -> The equivalent of a SQL Row. A single JSON-like object representing one record (e.g., one specific user's data).


* **MongoDB Atlas Setup Nuance:** After creating a cluster, you get a connection string/URI. Before you can connect, you must go to **Network Access** and select "Allow Access From Anywhere" (IP: `0.0.0.0/0`), otherwise, your backend code will throw a timeout error when trying to connect.

## 6. Mongoose & Connecting to the Database

Mongoose is an ODM (Object Data Modeling) library that bridges the gap between your Node.js application and MongoDB. (`npm i mongoose`)

### Vocabulary Mapping

* **Database:** Created using `mongoose.connect()`.
* **Collection:** Created using `mongoose.model()`.
* **Document:** Created using `Model.create()`.

### Connection Logic

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
    // Note: Use your actual MongoDB URI here
    const connectionInstance = await mongoose.connect('YOUR_MONGODB_URI');
    console.log(`Connected to MongoDB! Host: ${connectionInstance.connection.host}`);
};
connectDB();

```

* *Nuance:* Connecting to a database takes time, so it is an asynchronous operation. You must use `async/await` (often wrapped in an IIFE - Immediately Invoked Function Expression) to handle the promise. Checking `connectionInstance.connection.host` verifies a successful connection.

## 7. Creating the Schema and Model

* **Schema (Data Definition):** Defines the structure of your data. If you define only `name` and `age`, and the frontend tries to send `email`, Mongoose will silently ignore the `email` field and only save `name` and `age` to the database.
* **Model Nuance:** When passing the collection name into `mongoose.model()`, write it in **Singular, PascalCase** (e.g., `'User'`). MongoDB will automatically convert this to a lowercase plural format (`users`) in the actual database.

```javascript
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

```

## 8. Full CRUD Operations API

Here is how all four major operations (Create, Read, Update, Delete) are handled using Express and Mongoose.

### 1. Create (POST)

Takes data from the frontend (`req.body`) and saves it as a new document.

```javascript
app.post('/createUser', async (req, res) => {
    // req.body contains the JSON data sent from the frontend
    const createdUser = await User.create(req.body); 
    res.send({ createdUser });
});

```

### 2. Read (GET)

**Get All Users:** Returns an array of all documents in the collection.

```javascript
app.get('/getAllUsers', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

```

**Get Single User:** Finds a user based on specific criteria.

```javascript
app.get('/getSingleUser', async (req, res) => {
    // Assuming frontend sends the name in the request body
    const user = await User.findOne({ name: req.body.name });
    res.send(user);
});

```

* *Nuance:* `User.find()` returns an empty array `[]` if nothing is found. `User.findOne()` returns `null` if nothing is found.

### 3. Update (PUT)

Updates an existing document. Requires knowing *which* document to update (usually via its unique ID).

```javascript
app.put('/updateUser', async (req, res) => {
    // Taking the ID from the URL query parameters (e.g., ?id=12345)
    // Taking the updated data from the request body
    const updatedUser = await User.findByIdAndUpdate(
        req.query.id, 
        req.body, 
        { new: true } 
    );
    res.send({ updatedUser });
});

```

* *Nuance:* By default, Mongoose's update operations return the *old* document (the state before the update). You must pass the `{ new: true }` option to force it to return the newly updated document back to the frontend.

### 4. Delete (DELETE)

Removes a document based on its ID.

```javascript
app.delete('/deleteUser', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.query.id);
    res.send({ message: "User deleted successfully", deletedUser });
});

```

* *Nuance:* The response from `findByIdAndDelete` contains the data of the user that was just destroyed. This is the last time you will have access to this specific user's data.