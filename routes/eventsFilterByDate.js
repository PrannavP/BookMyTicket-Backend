const express = require('express');
const router = express.Router();

const { getEventsByDateController } = require('../controllers/eventController');

// Route to get events by specified date duration
router.post('/', getEventsByDateController);

module.exports = router;