const { getUsersGenresModel } = require('../models/UserGenresModel');

// Controller to get users booked events genre
const getUsersGenreController = async(req, res, next) => {
    try{
        const userId = req.body;

        const userGenresData = await getUsersGenresModel(userId);

        res.json(userGenresData);
    }catch(err){
        next(err);
    };
};

module.exports = {
    getUsersGenreController,
};