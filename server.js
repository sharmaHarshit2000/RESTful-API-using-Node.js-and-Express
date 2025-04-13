import express from "express";

// Create an Express server
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// In-memory users data
const users = [
  { id: 1, firstName: "Harshit", lastName: "Sharma", hobby: "Travelling" },
  { id: 2, firstName: "Rohit", lastName: "Maurya", hobby: "Photography" },
  { id: 3, firstName: "Akshay", lastName: "Yadav", hobby: "Singing" },
  { id: 4, firstName: "Vivek", lastName: "Verma", hobby: "Dancing" },
];

// Validation Middleware for POST and PUT requests
const validateUser = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body;

  // If any field is missing, return 400 Bad Request
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ message: "All fields are required." });
  }

  next(); // Proceed to the next middleware/route handler
};

// GET all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// POST a new user
app.post("/user", validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = { id, firstName, lastName, hobby };
  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT update user by ID - Full Upadte
app.put("/user/:id", validateUser, (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  // Update user properties
  Object.assign(user, req.body);

  res.status(200).json(user);
});

//  Patch update user by ID - Partial Upadte
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }
  Object.assign(user, req.body);

  res.status(200).json({ message: "User updated", user });
});

// DELETE user by ID
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.status(200).json({ message: "User deleted", user: deletedUser });
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
