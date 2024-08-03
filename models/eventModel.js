const pool = require('../config/dbConfig');

// Function to get all events
const getAllEvents = async () => {
	try {
		const query = 'SELECT * FROM event';
		const { rows } = await pool.query(query);
		return rows;
	} catch (error) {
		throw new Error('Error fetching events: ' + error.message);
	}
};

// Function to create new event
const createNewEvent = async (eventData) => {
	try{
		const query = "INSERT INTO event (event_name, event_date, event_time, event_location, event_performer, event_category, event_ticket_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
		const values = [eventData.event_name, eventData.event_date, eventData.event_time, eventData.event_location, eventData.event_performer, eventData.event_category, eventData.event_ticket_price];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
		throw new Error("Error create new event: " + err.message);
	};
};

module.exports = {
	getAllEvents,
	createNewEvent,
};