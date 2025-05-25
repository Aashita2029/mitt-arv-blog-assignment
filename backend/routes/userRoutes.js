// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD routes for users
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
