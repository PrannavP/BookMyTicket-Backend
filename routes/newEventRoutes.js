const express = require('express');
const router = express.Router();
const { createNewEventController } = require('../controllers/eventController');

// Route to get all events
router.post('/', createNewEventController);

module.exports = router;