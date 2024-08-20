// Import required modules
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const unserialize = require('node-serialize');
const app = express();
const port = 3000;

// MySQL setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

// SQL Injection Example
function getUserById(userId) {
  // Vulnerable to SQL Injection
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log(results);
  });
}

// Express setup
app.use(express.json());
app.use(bodyParser.json());

// Broken Authentication Example
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = { 'admin': 'password' };
  if (users[username] === password) {
    // Vulnerable to Broken Authentication
    res.send('Login successful!');
  } else {
    res.send('Invalid credentials');
  }
});

// Sensitive Data Exposure Example
app.get('/user', (req, res) => {
  // Sensitive data exposed in response
  res.json({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  });
});

// Cross-Site Scripting (XSS) Example
app.get('/xss', (req, res) => {
  // Vulnerable to XSS
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Welcome</h1>
      <p id="message"></p>
      <script>
        const message = new URLSearchParams(window.location.search).get('message');
        document.getElementById('message').innerHTML = message;
      </script>
    </body>
    </html>
  `);
});

// Insecure Deserialization Example
app.post('/data', (req, res) => {
  // Vulnerable to Insecure Deserialization
  const data = req.body.data;
  const obj = unserialize.unserialize(data);
  res.json(obj);
});

// Improper Error Handling Example
app.get('/error', (req, res) => {
  try {
    // Vulnerable to Improper Error Handling
    throw new Error('Something went wrong!');
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
