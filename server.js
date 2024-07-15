const express = require('express');
const connectToDatabase = require('./database/dbconnection');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
let db;

// Middleware
app.use(bodyParser.json());

const initialize = async () => {
  try {
    db = await connectToDatabase();
    console.log('Database connection initialized');
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    process.exit(1);
  }
};

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  try {
    const [result] = await db.execute(sql, [name, email, age]);
    res.status(201).json({ message: 'User created successfully', id: result.insertId, name, email, age });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const sql = 'SELECT * FROM users';
  try {
    const [results] = await db.execute(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  try {
    const [results] = await db.execute(sql, [id]);
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  try {
    const [result] = await db.execute(sql, [name, email, age, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  try {
    const [result] = await db.execute(sql, [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initialize();
});
