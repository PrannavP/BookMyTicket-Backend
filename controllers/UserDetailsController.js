const { getUserActiveTicketDetails, getUserUpcomingEventDetails, getTotalMoneySpentByUsers } = require("../models/UserModel");

// Controller to get users active tickets
const getUserActiveTicketController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userActiveTicketData = await getUserActiveTicketDetails(userId);

        res.json(userActiveTicketData);
    }catch(err){
        next(err);
    };
};

// Controller to get users upcoming booked events
const getUserActiveUpcomingEventController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userUpcomingEventData = await getUserUpcomingEventDetails(userId);

        res.json(userUpcomingEventData);
    }catch(err){
        next(err);
    };
};

// Controller to calculater user spent money
const getUsersTotalSpentController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userTotalSpentData = await getTotalMoneySpentByUsers(userId);

        res.json(userTotalSpentData);
    }catch(err){
        next(err);
    };
};

module.exports = {
    getUserActiveTicketController,
    getUserActiveUpcomingEventController,
    getUsersTotalSpentController
};