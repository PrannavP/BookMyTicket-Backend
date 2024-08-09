const express = require('express');
const router = express.Router();

const { getEventsByTimeController } = require('../controllers/eventController');

// Route to get events by specified time duration
router.post('/', getEventsByTimeController);

module.exports = router;