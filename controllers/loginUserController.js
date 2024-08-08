const { loginUserModel } = require('../models/loginUserModel');

// Controller to login
const loginUserController = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        // console.log(email, password);

        // validating email and password
        if(!email || !password){
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        // calling the login function
        const user = await loginUserModel(email, password);

        // return success response
        res.status(201).json({ user });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    loginUserController
};