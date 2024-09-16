const pool = require('../config/dbConfig');

// function to store in TICKETS TABLE
const storeBookingDetails = async (ticketData) => {
	try{
		const query = "INSERT INTO tickets(event_id, general_cat_ticket, vip_cat_ticket, total_price, payment_status, booked_by, ticket_qr_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
		const values = [ticketData.event_id, ticketData.general_cat_ticket, ticketData.vip_cat_ticket, ticketData.total_price, ticketData.payment_status, ticketData.booked_by, 'random_url.jpg'];
		const { rows } = await pool.query(query, values);
		return rows[0];
	}catch(err){
        console.log(err);
		throw new Error("Error while inserting ticket details in DB", err);
	};
};

module.exports = {
    storeBookingDetails,
};