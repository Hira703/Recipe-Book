const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

// Get all users
router.get('/all', userController.getAllUsers);

// Get single user by email using query param: /users?email=user@example.com
router.get('/', userController.getUserByEmail);

// Get single user by ID: /users/:id
;

// Create or update user
router.post('/', userController.createUser);

module.exports = router;
