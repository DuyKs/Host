// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import the cors middleware
// const bcrypt = require('bcrypt');
// const User = require('./User');
// const Faculty = require('./Faculty');

// const app = express();
// const port = process.env.PORT || 5000; // Use environment variable for port

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => console.error(err));

// // Middleware
// app.use(bodyParser.json());

// // Enable CORS
// app.use(cors());

// // Route to fetch all users
// app.get('/getAllUsers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to handle user login
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Check if full name or password is empty
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Full name and password are required' });
//   }

//   try {
//     // Find the user in the database based on the provided full name
//     const user = await User.findOne({ username });

//     // If user is not found, return an error
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // Compare passwords
//     if (password !== user.password) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // If user is found and password matches, return success message
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to fetch all users
// app.get('/getAllUsers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to fetch all Faculties
// app.get('/getAllFaculties', async (req, res) => {
//   try {
//     const faculties = await Faculty.find();
//     res.status(200).json(faculties);
//   } catch (error) {
//     console.error('Error fetching faculties:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to add a new user
// app.post('/addUser', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json({ message: 'User added successfully' });
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to update a user
// app.put('/updateUser/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndUpdate(id, req.body);
//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Route to delete a user
// app.delete('/deleteUser/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndDelete(id);
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });






const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Adjust path to access .env outside of database

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const bcrypt = require('bcrypt');
const User = require('./User');
const Faculty = require('./Faculty');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.AES_SECRET_KEY; // Ensure the key is stored securely in your .env file

const app = express();
const port = process.env.MONGODB_PORT || 5000; // Use environment variable for port

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());
const crypto = require('crypto');

// AES encryption and decryption functions
const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (hash) => {
  const [iv, content] = hash.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  return decrypted.toString();
};

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

// Route to handle user login
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

    // Decrypt the stored password
    const decryptedPassword = decrypt(user.password);

    // Compare passwords
    if (password !== decryptedPassword) {
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

// Route to add a new user
app.post('/addUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
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

