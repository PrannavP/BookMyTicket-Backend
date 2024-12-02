const pool = require('../config/dbConfig');

// function to store in TICKETS TABLE
const storeBookingDetails = async (ticketData) => {
	try{
		const query = "INSERT INTO tickets(event_id, general_cat_ticket, vip_cat_ticket, total_price, payment_status, booked_by, ticket_qr_image, organized_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
		const values = [ticketData.event_id, ticketData.general_cat_ticket, ticketData.vip_cat_ticket, ticketData.total_price, ticketData.payment_status, ticketData.booked_by,'random_url.jpg', ticketData.organized_by];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
        console.log(err);
		throw new Error("Error while inserting ticket details in DB", err);
	};
};

// function to verify ticket details (mainly for organizers)
const verifyTicketBooking = async (txnID) => {
	try{
		const query = "SELECT * FROM transactions WHERE transaction_uuid = $1";
		const values = [txnID];
		const { rows } = await pool.query(query, values);

		return rows[0];

	}catch(err){
		throw new Error("Error while getting transaction by uuid");
	}
};

// function to get total amount earned from tickets sold by an organizer
const totalTicketsSum = async (organized_by) => {
	try{
		const query = "SELECT SUM(total_price) as total_sum from tickets where organized_by = $1";
		const values = [organized_by];
		const { rows } = await pool.query(query, values);

		return rows[0];;
	}catch(err){
		throw new Error("Error while getting total earning of the organizer.");
	}
};

// function to get total tickets sold by an organizer
const totalTicketsSold = async (organized_by) => {
	try{
		const query = "SELECT SUM(general_cat_ticket + vip_cat_ticket) as total_tickets from tickets where organized_by = $1";
		const values = [organized_by];
		const { rows } = await pool.query(query, values);

		return rows[0];
	}catch(err){
		throw new Error("Error while getting total tickets sold.");
	}
};

// function to get total active events of an organizer
const totalActiveEvents = async (organized_by) => {
	try{
		const query = "SELECT COUNT(*) as events_count FROM event WHERE event_organizer = $1";
		const values = [organized_by];
		const { rows } = await pool.query(query, values);

		return rows[0];
	}catch(err){
		throw new Error("Error while getting total active events.");
	}
};

// function to get active tickets details of a attendee
const attendeeActiveTicketDetails = async (attendee_id) => {
	try{
		const query = "SELECT e.*, t.* FROM event e JOIN tickets t ON e.id = t.event_id WHERE t.booked_by = $1 AND e.event_date >= NOW()";
		const values = [attendee_id];
		const { rows } = await pool.query(query, values);
		
		// console.log(rows);

		return rows;
	}catch(err){
		throw new Error("Error while getting attendee active ticket details.");
	}
};

// function to get past tickets details of a attendee
const attendeePastTicketDetails = async (attendee_id) => {
	try{
		const query = "SELECT e.*, t.* FROM event e JOIN tickets t ON e.id = t.event_id WHERE t.booked_by = $1 AND e.event_date < NOW()";
		const values = [attendee_id];
		const { rows } = await pool.query(query, values);

		return rows;
	}catch(err){
		throw new Error("Error while getting attendee past ticket details.");
	}
};

// function to get booked ticket details for organizers
const bookedTicketDetails = async (organized_by) => {
	try{
		const query = `
			SELECT tickets.*, users.*, event.* FROM 
			tickets JOIN users ON tickets.booked_by = users.user_id
			JOIN event ON tickets.event_id = event.id WHERE event.event_organizer = $1
		`;
		const values = [organized_by];
		const { rows } = await pool.query(query, values);

		return rows;
	}catch(err){
		throw new Error("Error while getting booked ticket details.");
	}
};

// function to update payment_status after payment success
const changePaymentStatus = async (ticketid) => {
	try{
		const query = `UPDATE tickets SET payment_status = "PAID" WHERE id = $1`;
		const values = [ticketid];
		const { rows } = await pool.query(query, values);

		return rows;
	}catch(err){
		throw new Error("Error while updating payment status.");
	}
};

module.exports = {
    storeBookingDetails,
	verifyTicketBooking,
	totalTicketsSum,
	totalTicketsSold,
	totalActiveEvents,
	attendeeActiveTicketDetails,
	attendeePastTicketDetails,
	bookedTicketDetails,
	changePaymentStatus,
};