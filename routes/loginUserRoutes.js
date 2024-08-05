const express = require('express');
const router = express.Router();
const { loginUserController } = require('../controllers/loginUserController');

// Route to login user
router.post('/', loginUserController);

module.exports = router;