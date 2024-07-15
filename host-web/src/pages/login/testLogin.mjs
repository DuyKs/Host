import fetch from 'node-fetch';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory name
const __dirname = path.dirname(__filename);

// Specify the path to your .env file
const envPath = path.resolve(__dirname, '../../../.env');

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

const loginCheck = async (username, password) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/login`;
    console.log('Server URL:', url); // Display current REACT_APP_SERVER_URL

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data.message);
      console.log('User:', data.user); // If you want to see the user details
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your username: ', (username) => {
  rl.question('Enter your password: ', (password) => {
    loginCheck(username, password);
    rl.close();
  });
});
