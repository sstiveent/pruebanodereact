const { connectDB } = require('../database/connection');

const createTask = async (req, res) => {
  try {
    const pool = await connectDB();
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'title, description are required' });
    }
    const user_id = req.user.id; //From database/middleware/connection

    const query = 'INSERT INTO taskmanager.tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, description, user_id];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    const pool = await connectDB();
    const user_id = req.user.id; //From database/middleware/connection
    const query = 'SELECT * FROM taskmanager.tasks WHERE user_id = $1';
    const values = [user_id];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const pool = await connectDB();
    const { id } = req.params;
    if (!id ) {
      return res.status(400).json({ error: 'id is required' });
    }
    const query = 'SELECT * FROM taskmanager.tasks WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const pool = await connectDB();
    const { id } = req.params;
    const { title, description } = req.body;
    if (!id || !title || !description) {
      return res.status(400).json({ error: 'id, title, description are required' });
    }
    const query = 'UPDATE taskmanager.tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
    const values = [title, description, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    console.log(req.body);
    const pool = await connectDB();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    const query = 'DELETE FROM taskmanager.tasks WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};

module.exports = {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
};
