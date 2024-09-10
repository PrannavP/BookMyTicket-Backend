const express = require('express');
const router = express.Router();
const { getAllEventsController, getFilteredEventsController, getEventByIDController } = require('../controllers/eventController');

// Route to get all events
router.get('/', getAllEventsController);

// Route to get events by filtering
router.get('/filter', getFilteredEventsController);

// Route to get event by ID
router.get('/eventdetails/:id', getEventByIDController);

module.exports = router;