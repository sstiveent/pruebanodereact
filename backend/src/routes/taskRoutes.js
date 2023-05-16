const express = require('express');
const taskController = require('../controllers/taskController');
const { isAuthenticated } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', isAuthenticated, taskController.createTask);
router.get('/', isAuthenticated, taskController.getTasksByUserId);
router.get('/:id', isAuthenticated, taskController.getTaskById);
router.put('/:id', isAuthenticated, taskController.updateTask);
router.delete('/:id', isAuthenticated, taskController.deleteTask);

module.exports = router;

