const express = require('express');
const router = express.Router();
const EventImageUpload = require('../middleware/eventImageUploadMiddleware');
const { createNewEventController } = require('../controllers/eventController');

// Route to get all events
router.post('/', EventImageUpload.single('event_image'), createNewEventController);

module.exports = router;