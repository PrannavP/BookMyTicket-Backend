const { loginUserModel, getUserById } = require('../models/loginUserModel');
const { generateToken }  = require('../auth/auth');

// Controller to login
const loginUserController = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        // validating email and password
        if(!email || !password){
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        // calling the login function
        const user = await loginUserModel(email, password);

        // generate the JWT token
        const token = generateToken(user.id);
        res.status(201).json({ login: true, message: 'Login successful', token, user });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

// controller to get user info
const userController = async (req, res) => {
    try{
      const userId = req.params.id;
      
      if(!userId){
        return res.status(400).json({ error: 'User ID is required.' });
      }

      // calling the getuser function
      const user = await getUserById(userId);

      res.status(201).json({ user });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    loginUserController,
    userController
};