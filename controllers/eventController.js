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
      const { event_name, event_date, event_time, event_location, event_performer, event_category, event_ticket_price } = req.body;
      const eventImage = req.file ? req.file.filename : null;

      const eventData = {
        event_name,
        event_date,
        event_time,
        event_location,
        event_performer,
        event_category,
        event_ticket_price,
        event_image: eventImage
      };

      // console.log(req.file);

      const newEvent = await createNewEvent(eventData);
      res.status(201).json({ newEvent });
    }catch(err){
      res.status(500).json({ error: err.message });
    };
}

module.exports = {
  getAllEventsController,
  createNewEventController,
};
