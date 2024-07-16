const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

