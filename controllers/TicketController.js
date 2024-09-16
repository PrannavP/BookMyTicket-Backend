const {
    storeBookingDetails
} = require('../models/TicketDetailsModel');

// Controller to store tickets detail after booking
const storeBookingDetailsController = async(req, res, next) => {
    try{
        const { event_id, general_cat_ticket, vip_cat_ticket, total_price, payment_status, booked_by } = req.body;

        const ticketData = {
            event_id,
            general_cat_ticket,
            vip_cat_ticket,
            total_price,
            payment_status,
            booked_by
        };

        const newTicket = await storeBookingDetails(ticketData);
        console.log(newTicket);
        res.status(201).json({ newTicket });
    }catch(err){
      	res.status(500).json({ error: err.message });
    };
};

module.exports = {
    storeBookingDetailsController,
}