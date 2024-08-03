const { getAllEvents, createNewEvent } = require('../models/eventModel');

// Controller to get all events
const getAllEventsController = async (req, res, next) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
};


// Controller to create new event
const createNewEventController = async (req, res, next) => {
    try{
      const eventData = req.body;
      const newEventData = await createNewEvent(eventData);
      res.status(201).json(newEventData);
    }catch(err){
      res.status(500).json({ error: err.message });
    };
}

module.exports = {
  getAllEventsController,
  createNewEventController,
};
