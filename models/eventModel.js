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
		const query = "INSERT INTO event (event_name, event_date, event_time, event_location, event_performer, event_category, event_ticket_price, event_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
		const values = [eventData.event_name, eventData.event_date, eventData.event_time, eventData.event_location, eventData.event_performer, eventData.event_category, eventData.event_ticket_price, eventData.event_image];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
		throw new Error("Error create new event: " + err.message);
	};
};

// get events by date
const getEventByDates = async (filterdDates) => {
	try{
		const query = "SELECT * FROM event WHERE event_date >= $1 AND event_date <= $2";
		const values = [filterdDates.fromDate, filterdDates.toDate];
		const { rows } = await pool.query(query, values);
		if(rows && rows.length >0){
			return rows;
		}else{
			return { message: "No events found." };
		};
	}catch(err){
		throw new Error("Error while filtering events by date: " + err.message);
	};
};

// get events by time
const getEventsByTime = async (filterdTime) => {
	try{
		const query = "SELECT * FROM event WHERE event_time >= $1 AND event_time <= $2";
		const value = [filterdTime.fromTime, filterdTime.toTime];
		const { rows } = await pool.query(query,value);
		if(rows && rows.length > 0){
			return rows;
		}else{
			return { message: "No events found." };
		}
	}catch(err){
		throw new Error("Error while filtering by time: " + err.message);
	};
};

module.exports = {
	getAllEvents,
	createNewEvent,
	getEventByDates,
	getEventsByTime
};