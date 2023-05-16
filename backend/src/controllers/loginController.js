const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../database/connection');


const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        pool = await connectDB();
        const query = 'SELECT * FROM taskmanager.users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id:user.id, fullname:user.fullname }, process.env.JWT_SECRET_KEY);
        res.json({ data: { token: token } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

module.exports = {
    login
}