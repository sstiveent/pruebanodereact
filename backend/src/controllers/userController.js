const bcrypt = require('bcrypt');
const { connectDB } = require('../database/connection');


const createUser = async (req, res) => {
  try {
    const pool = await connectDB();
    const { fullname, username, password } = req.body;

    if (!fullname || !username || !password) {
      return res.status(400).json({ error: 'fullname, username, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query1 = 'SELECT id FROM taskmanager.users where username = $1';
    const values1 = [username];
    const result1 = await pool.query(query1, values1);
    if (result1.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const query = 'INSERT INTO taskmanager.users (fullname, username, password) VALUES ($1, $2, $3) RETURNING id';
    const values = [fullname, username, hashedPassword];
    const result = await pool.query(query, values);
    res.status(201).json({ data: result.rows[0] });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const pool = await connectDB();
    const query = 'SELECT id, fullname, username FROM taskmanager.users';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const pool = await connectDB();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    const query = 'SELECT id, fullname, username FROM taskmanager.users WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const pool = await connectDB();
    const { id } = req.params;
    const { fullname, username, password } = req.body;
    if (!id || !fullname || !username || !password) {
      return res.status(400).json({ error: 'id, fullname, username, password are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE taskmanager.users SET fullname = $1, username = $2, password = $3 WHERE id = $4 RETURNING *';
    const values = [fullname, username, hashedPassword, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const pool = await connectDB();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    const query = 'DELETE FROM taskmanager.users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
