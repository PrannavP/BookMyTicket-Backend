const { registerNewUser } = require('../models/UserModel');

// Controller to get all events
const registerNewUserController = async (req, res, next) => {
    try{
        const userData = req.body;
        const newUser = await registerNewUser(userData);
        res.status(201).json({ newUser });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    registerNewUserController,
};
