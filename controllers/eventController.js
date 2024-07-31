const { getAllEvents } = require('../models/eventModel');

// Controller to get all events
const getAllEventsController = async (req, res, next) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEventsController,
};
