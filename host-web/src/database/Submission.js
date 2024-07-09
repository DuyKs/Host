const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentName: String,
  faculty: String,
  magazineTitle: String,
  magazineContent: String,
  coverImage: String,
  document: String,
  submissionDate: { type: Date, default: Date.now }, // Default submission date to current date
  submissionStatus: { type: String, default: 'Pending' }, // Default submission status to 'pending'
  comment: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
