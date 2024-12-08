const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  summary: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Summary', summarySchema);
