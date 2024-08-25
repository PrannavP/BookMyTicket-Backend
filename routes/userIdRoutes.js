const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { userController } = require('../controllers/loginUserController');

// Route to get user data by id
router.get('/:id', auth ,userController);

module.exports = router;