# 👨‍💻 Node JS RESTful API

This is a simple RESTful API built using **Node.js** and **Express** to manage a list of users.  
It demonstrates basic CRUD operations, middleware usage, error handling, and in-memory data storage.

---

## 🔧 Features

- Get all users
- Get a specific user by ID
- Add a new user
- Update a user (full or partial)
- Delete a user
- Middleware for request logging
- Validation middleware for required fields
- In-memory data source (no database required)

---

## 🛠 Technologies Used

- Node.js
- Express.js
- ThunderClient (for testing)

---

## 📦 Setup & Installation

```bash
# Clone the repository
git https://github.com/sharmaHarshit2000/RESTful-API-using-Node.js-and-Express-.git

# Navigate to the project directory
cd RESTful-API-using-Node.js-and-Express-.git

# Install dependencies
npm install

# Start the server
node index.js

🚀 API Endpoints

Method	Endpoint	Description
GET	    /users	    Get all users
GET	    /users/:id	Get a user by ID
POST	/user	    Add a new user
PUT	    /user/:id	Update a user (full)
PATCH	/user/:id	Update a user (partial)
DELETE	/user/:id	Delete a user by ID


📂 Sample User Object
{
  "id": 1,
  "firstName": "Harshit",
  "lastName": "Sharma",
  "hobby": "Travelling"
}