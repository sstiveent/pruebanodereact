const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', userController.createUser);
//router.get('/', isAuthenticated, userController.getUsers);
router.get('/:id', isAuthenticated, userController.getUserById);
router.put('/:id', isAuthenticated, userController.updateUser);
//router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
