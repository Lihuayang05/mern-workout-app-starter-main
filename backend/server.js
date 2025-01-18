// Entry file for the backend app
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
// Parse and attach data sent to server to request object
app.use(express.json());

// CORS Middleware
// Allow requests from all origins (for development only)
app.use(cors());

// Global middleware
// Logs the request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// workoutRoutes is triggered when we make a request to /api/workouts
app.use("/api/workouts", workoutRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
