const express = require('express');
const router = express.Router();
const { getAllEventsController } = require('../controllers/eventController');

// Route to get all events
router.get('/', getAllEventsController);

module.exports = router;