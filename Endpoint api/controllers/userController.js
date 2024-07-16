const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "..", "data", "users.json");

// function to read and write the JSON file
const readData = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

// Get all users
const getAllUsers = (req, res) => {
  const users = readData();
  if (users.length === 0) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json({ users });
};

// Get user by ID
const getUserById = (req, res) => {
  const users = readData();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  res.status(200).json(user);
};

// Create new user
const createUser = (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }
  const users = readData();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  users.push(newUser);
  writeData(users);
  res.status(200).json(newUser);
};

// Update user by ID
const updateUserById = (req, res) => {
  const { username, email } = req.body;
  const users = readData();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  if (username) user.username = username;
  if (email) user.email = email;
  user.updated_at = new Date().toISOString();
  writeData(users);
  res.status(200).json(user);
};

// Delete user by ID
const deleteUserById = (req, res) => {
  const users = readData();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User doesn't exist" });
  }
  users.splice(userIndex, 1);
  writeData(users);
  res.status(200).json({ message: "Deleted successfully" }); // Including a message
};



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
