const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./User');
const Faculty = require('./Faculty');

const app = express();
const port = process.env.MONGODB_PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors());

// Route to fetch all users
app.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Login route with support for both hashed and non-hashed passwords
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is empty
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find the user in the database based on the provided username
    const user = await User.findOne({ username });

    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the stored password is hashed
    const isHashed = user.password.startsWith('$2b$');

    let isMatch;
    if (isHashed) {
      // Password is hashed, compare with bcrypt
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Password is not hashed, compare directly
      isMatch = password === user.password;

      // If password matches, hash the plaintext password and update the user record
      if (isMatch) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If user is found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to fetch all faculties
app.get('/getAllFaculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to add a new user (Admin or Authorized User)
app.post('/addUser', async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = new User({ username, email, isActive: false });
    await user.save();

    // Generate a token for setting password via email
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send an email with a link to set the password
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Update with your email service provider
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Set your password',
      text: `Please click on the following link, or paste it into your browser to set your password:\n\n
        http://${req.headers.host}/set-password/${token}\n\n`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending email' });
      }
      console.log('Email sent:', info.response); // Add this console log to verify
      res.status(200).json({ message: 'User added successfully, please check your email to set your password' });
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// User sets password via email link
app.post('/set-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find the user by the password reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password and save it to the user record
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.isActive = true; // Activate user account
    await user.save();

    res.status(200).json({ message: 'Password has been set successfully.' });
  } catch (error) {
    console.error('Error setting password:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to update a user
app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to delete a user
app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

