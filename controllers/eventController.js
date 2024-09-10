const { 
    getAllEvents, 
    createNewEvent, 
    getFilteredEvents,
    getEventByIDModel,
    } = require('../models/eventModel');

// Controller to get all events
const getAllEventsController = async (req, res, next) => {
    try {
        const events = await getAllEvents();
        setTimeout(() => {
            res.json(events);
        }, 1000);
    } catch (err) {
        next(err);
    }
};

// Controller to get event by ID
const getEventByIDController = async (req, res, next) => {
    try{
        const id = req.params.id;
        const event = await getEventByIDModel(req.params.id);
        res.json(event);
    }catch(err){
        next(err);
    }
};

const getFilteredEventsController = async (req, res, next) => {
    try {
        const { fromTime, toTime, fromDate, toDate, location, genre } = req.query;

        const events = await getFilteredEvents({
            fromTime,
            toTime,
            fromDate,
            toDate,
            location,
            genre
        });

        // Ensure the response is always an array
        if (Array.isArray(events)) {
            res.json(events);
        } else {
            res.json([]);
        }
    } catch (error) {
        next(error);
    }
};


// Controller to create new event
const createNewEventController = async (req, res, next) => {
    try{
        const { event_name, event_date, event_time, event_location, event_performer, event_category, event_ticket_general_price, event_ticket_vip_price, event_total_tickets, event_remaining_tickets } = req.body;
        const eventImage = req.file ? req.file.filename : null;

        const eventData = {
            event_name,
            event_date,
            event_time,
            event_location,
            event_performer,
            event_category,
            event_ticket_general_price,
            event_image: eventImage,
            event_ticket_vip_price,
            event_total_tickets,
            event_remaining_tickets
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
    getFilteredEventsController,
    getEventByIDController,
};
