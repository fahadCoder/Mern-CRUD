// const app=require('express');
const express = require("express");

// const http=require('http').Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://RajaFahad:rajafahad324@crud.he2qqor.mongodb.net/?retryWrites=true&w=majority"
);
const User = require("./models/userModel");
const app = express();
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to receive data from the frontend
app.post("/sendData", async (req, res) => {
  const { _id, name, email, city, salary } = req.body;
  console.log("Data received from frontend:", {
    _id,
    name,
    email,
    city,
    salary,
  });

  if (_id == "") {
    // Create a new document with the received data
    const newUser = new User({
      name,
      email,
      city,
      salary,
    });

    try {
      // Save the data to MongoDB
      const savedData = await newUser.save();
      console.log("Data saved to MongoDB:", savedData);

      // Sending a success response back to the frontend
      res.json({ message: "Data received and saved successfully!" });
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
      // Sending an error response back to the frontend
      res.status(500).json({ error: "Failed to save data to MongoDB" });
    }
  } else {
    // Find the user by _id and update the fields
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { name, email, city, salary },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Error updating user data" });
    }
  }
});
// GET route to fetch all users from the database
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as JSON response
    console.log("getting Data :: ", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" }); // Send error response
  }
});

// DELETE route to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});
// PUT route to update a user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, city, salary } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, city, salary },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});
app.listen(5000, function () {
  console.log("server is running ");
});
