// routes/historyRoutes.js
const express = require("express");
const History = require("../models/History.js"); // Import the History model
const router = express.Router();

// GET /api/history - Fetch all history
router.get("/", async (req, res) => {
  try {
    const history = await History.find().sort({ date: -1 }); // Fetch and sort by date (most recent first)
    res.status(200).json(history); // Send the history as JSON
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch history." });
  }
});

// POST /api/history - Add a new history entry
router.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ message: "Query is required." });
  }

  try {
    const newHistory = new History({ query });
    await newHistory.save(); // Save to database
    res.status(201).json({ message: "History added successfully." });
  } catch (error) {
    console.error("Error saving history:", error.message);
    res.status(500).json({ message: "Server error. Unable to add history." });
  }
});

module.exports = router;
