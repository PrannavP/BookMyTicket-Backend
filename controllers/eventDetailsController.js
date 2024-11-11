const { getEventTicketsSold } = require("../models/eventDetailsModel");

// Controller to get event tickets sold data
const getEventTicketsSoldController  = async (req, res, next) => {
    try{
        const eventOrganizerEmail = req.body.organizerEmail;
        const eventsTicketsSoldData = await getEventTicketsSold(eventOrganizerEmail);
        res.json(eventsTicketsSoldData);
    }catch(err){
        next(err);
    }
};

module.exports = {
    getEventTicketsSoldController,
}