const eventModal = require('../models/eventModel');

const getAllEvents = async () => {
    return await eventModal.getAllEvents();
};

module.exports = {
    getAllEvents,
};