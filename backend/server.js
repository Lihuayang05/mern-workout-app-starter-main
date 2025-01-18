require("dotenv").config();

// Require express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Require cors package

// Require routes
const workoutRoutes = require("./routes/workouts");

// Set up the express app
const app = express();

// Middleware:
// Parse and attach data sent to the server to the request object
app.use(express.json());

// CORS Middleware
// Allow requests from all origins (for development only)
app.use(cors());

// Global middleware
// Logs the request path and method
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
// Trigger workoutRoutes when we make a request to /api/workouts
app.use("/api/workouts", workoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Error handling middleware for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
