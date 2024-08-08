const { registerNewUser } = require('../models/UserModel');

// Controller to get all events
const registerNewUserController = async (req, res, next) => {
    try{
        const { full_name, email, password, contact_number, address, age } = req.body;
        const profileImage = req.file ? req.file.filename : null; // Get filename from multer

        const userData = {
            full_name,
            email,
            password,
            contact_number,
            address,
            age,
            profile_image: profileImage
        };

        const newUser = await registerNewUser(userData);

        res.status(201).json({ newUser });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    registerNewUserController,
};
