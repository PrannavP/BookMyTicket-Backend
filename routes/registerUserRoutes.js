const express = require('express');
const router = express.Router();
const { registerNewUserController } = require('../controllers/registerUserController');

// Route to get all events
router.post('/', registerNewUserController);

module.exports = router;