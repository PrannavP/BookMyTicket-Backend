const { getUsersGenresModel, getEventsAccordingGenre } = require('../models/UserGenresModel');
const sendAnnouncementEmail = require("../services/sendAnnouncementEmail");

// Controller to get users booked events genre
const getUsersGenreController = async(req, res, next) => {
    try{
        const users = await getUsersGenresModel();

        const event = req.body;

        // filter users by genre and send emails
        users.forEach((user) => {
            if(user.genres.includes(event.category)){
                sendAnnouncementEmail(user, event);
                res.json("Sent Announcement Email");
            }
        });
    }catch(err){
        next(err);
    };
};

// Controller to get events according to attendee's past genre
// const getEventsAccordingGenreController = async (req, res, next) => {
//     try{
//         const genresArray = 
//     }
// };

module.exports = {
    getUsersGenreController,
};