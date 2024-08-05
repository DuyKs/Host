const mongoose = require('mongoose');

// Define SubmissionWindow schema
const submissionWindowSchema = new mongoose.Schema({
  faculty: {
    type: String,
    required: true,
    unique: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

// Create SubmissionWindow model
const SubmissionWindow = mongoose.model('SubmissionWindow', submissionWindowSchema);

module.exports = SubmissionWindow;
