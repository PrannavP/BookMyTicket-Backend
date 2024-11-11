const {
    storeBookingDetails,
    verifyTicketBooking,
    totalTicketsSum,
    totalTicketsSold,
    totalActiveEvents,
    attendeeActiveTicketDetails,
    attendeePastTicketDetails,
    bookedTicketDetails,
} = require('../models/TicketDetailsModel');

// Controller to store tickets detail after booking
const storeBookingDetailsController = async(req, res, next) => {
    try{
        const { event_id, general_cat_ticket, vip_cat_ticket, total_price, payment_status, booked_by, organized_by } = req.body;

        const ticketData = {
            event_id,
            general_cat_ticket,
            vip_cat_ticket,
            total_price,
            payment_status,
            booked_by,
            organized_by,
        };

        const newTicket = await storeBookingDetails(ticketData);
        // console.log(newTicket);
        res.status(201).json({ newTicket });
    }catch(err){
      	res.status(500).json({ error: err.message });
    };
};

// Controller to verify ticket by uuid
const verifyTicketController = async (req, res,  next) => {
    try{
        const transaction_uuid = req.body.txn_uuid;
        const transaction = await verifyTicketBooking(transaction_uuid);
        res.json(transaction);
    }catch(err){
        next(err);
    }
};

// Controller to get total earning of organizer
const organizerTotalEarningController = async (req, res, next) => {
    try{
        const organized_by = req.body.organized_by;
        const totalEarning = await totalTicketsSum(organized_by);;
        res.json(totalEarning);
    }catch(err){
        next(err);
    }
};

// Controller to get total tickets sold by organizer
const organizerTotalTicketsSoldController = async (req, res, next) => {
    try{
        const organized_by = req.body.organized_by;
        const totalTicketsSoldValue = await totalTicketsSold(organized_by);
        res.json(totalTicketsSoldValue);
    }catch(err){
        next(err);
    }
};

// Controller to get total active events of an organizer
const organizerTotalActiveEventsController = async (req, res, next) => {
    try{
        const organized_by = req.body.organized_by;
        const totalActiveEventsValue = await totalActiveEvents(organized_by);
        res.json(totalActiveEventsValue);
    }catch(err){
        next(err);
    }
};

// Controller to get attendee's active ticket details
const attendeeActiveTicketDetailsController = async (req, res, next) => {
    try{
        const attendeeId = req.body.user_id;
        const attendeeActiveTickets = await attendeeActiveTicketDetails(attendeeId);
        res.json(attendeeActiveTickets);
    }catch(err){
        next(err);
    }
};

// Controller to get attendee's past ticket details
const attendeePastTicketDetailsController = async (req, res, next) => {
    try{
        const attendeeId = req.body.user_id;
        const attendeePastTickets = await attendeePastTicketDetails(attendeeId);
        res.json(attendeePastTickets);
    }catch(err){
        next(err);
    }
};

// Controller to get booked ticket details
const bookedTicketDetailsController = async (req, res, next) => {
    try{
        const organized_by = req.body.organized_by;
        const bookedTickets = await bookedTicketDetails(organized_by);
        res.json(bookedTickets);
    }catch(err){
        next(err);
    }
}; 

module.exports = {
    storeBookingDetailsController,
    verifyTicketController,
    organizerTotalEarningController,
    organizerTotalTicketsSoldController,
    organizerTotalActiveEventsController,
    attendeeActiveTicketDetailsController,
    attendeePastTicketDetailsController,
    bookedTicketDetailsController,
}