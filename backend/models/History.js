// models/History.js
const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  query: { type: String, required: true }, // Search query
  summary : {type:String},
  date: { type: Date, default: Date.now }  // Timestamp
});

module.exports = mongoose.model("History", HistorySchema);
