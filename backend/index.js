const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
  console.log(`Sever start on ${port}`);
});
