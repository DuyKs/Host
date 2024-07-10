const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default port 5000

const MONGODB_URI = "mongodb+srv://admin:1234567890@awm.uh2y87l.mongodb.net/?retryWrites=true&w=majority&appName=AWM";
const DATABASE_NAME = "AWM";

// Connect to MongoDB database
let db;
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(DATABASE_NAME);
  })
  .catch(err => console.error(err));

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required for login');
  }

  // Find user in database - adjust field name for "user_name"
  const user = await db.collection('Users').findOne({ user_name: username });

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid username or password');
  }

  // Successful login (logic can be extended here - generate token, etc.)
  // You can include user information (excluding password) in the response
  const { user_name, role } = user; // Assuming these are the fields you want
  res.send({ message: 'Login successful', user: { user_name, role } });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
