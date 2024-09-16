const pool = require('../config/dbConfig');

// Function to decrease remaining tickets
const decreaseEventRemainingTickets = async (eventID) => {
	try{
		const query = "UPDATE event SET event_remaining_tickets = event_remaining_tickets - 1 WHERE id = $1";
		const value = [eventID];
		console.log('event model ma ho', eventID);
		const { rows } = await pool.query(query, value);
		return rows[0];
	}catch(err){
		throw new Error("Error while decreasing remaining tickets after booking!", err.message);
	};
};

// Function to create new event
const createNewEvent = async (eventData) => {
	try{
		const query = "INSERT INTO event (event_name, event_date, event_time, event_location, event_performer, event_category, event_ticket_general_price, event_image, event_ticket_vip_price, event_total_tickets, event_remaining_tickets) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
		const values = [eventData.event_name, eventData.event_date, eventData.event_time, eventData.event_location, eventData.event_performer, eventData.event_category, eventData.event_ticket_general_price, eventData.event_image, eventData.event_ticket_vip_price, eventData.event_total_tickets, eventData.event_remaining_tickets];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
		throw new Error("Error create new event: " + err.message);
	};
};

// Function to get event by ID
const getEventByIDModel = async (eventID) => {
	try{
		const query = 'SELECT * FROM event WHERE id = $1';
		const values = [eventID];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
		throw new Error("Error while getting event by ID.", err.message);
	};
};

// Function to get all events
const getAllEvents = async () => {
	try {
		const query = 'SELECT * FROM event';
		const { rows } = await pool.query(query);
		return rows;
	} catch (err) {
		throw new Error('Error fetching events: ' + err);
	}
};

const getFilteredEvents = async ({ fromTime, toTime, fromDate, toDate, location, genre }) => {
	let query = "SELECT * FROM event WHERE 1=1";
	const values = [];
	let paramIndex = 1;

	if(fromDate && toDate){
		query += ` AND event_date BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
		values.push(fromDate, toDate);
		paramIndex += 2;
	};

	if(fromTime && toTime){
		query += ` AND event_time BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
		values.push(fromTime, toTime);
		paramIndex += 2;
	};

	if(location){
        query += ` AND event_location ILIKE $${paramIndex}`;
        values.push(`%${location}%`);
        paramIndex++;
	};

	if(genre){
		query += ` AND event_category ILIKE $${paramIndex}`;
		values.push(`%${genre}%`);
		paramIndex++;
	};

	const { rows } = await pool.query(query, values);
	return rows;
};

module.exports = {
	getAllEvents,
	createNewEvent,
	getFilteredEvents,
	getEventByIDModel,
	decreaseEventRemainingTickets,
};