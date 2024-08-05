// Import mongoose
const mongoose = require('mongoose');

// Define the Faculty schema
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinator: {
    type: String,
    required: false
  }
});

// Create the Faculty model
const Faculty = mongoose.model('Faculty', facultySchema,);

// Export the Faculty model
module.exports = Faculty;

/*
Create a database for magazines
Magazine Title:
Magazine  Author:
Magazine Publication Date:
Magazine Status: ( Published/Unpublished/Community Publish)
Magazine  Photo:
Magazine PDF file:
Magazine Comment:

Also a database for this storing Magazines Faculties , each Faculty can store many Magazines 
Faculty of Engineering:
Faculty of Arts: 
Faculty of Business and Economics: 
*/