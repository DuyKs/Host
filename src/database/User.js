const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  faculty: String,
});

// Define the User model with the 'users' collection
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;