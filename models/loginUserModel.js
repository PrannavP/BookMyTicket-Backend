const bcrypt = require('bcryptjs');

const pool = require('../config/dbConfig');

// function to login a user
const loginUserModel = async (email, password) => {
    try{
        // finding the user by email
        const query = "SELECT * FROM users WHERE email = $1";
        const { rows } = await pool.query(query, [email]);

        if(rows.length === 0){
            throw new Error('User not found.');
        }

        const user = rows[0];

        // comparing the password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Invalid password');
        }
        
        return { id: user.user_id, full_name: user.full_name, address:user.address, contact_number: user.contact_number, role: user.user_type, image: user.profile_image };
    }catch(err){
        throw new Error('Error logging in user: ' + err.message);
    }
};

const getUserById = async (uid) => {
    try{
        const query = "SELECT * FROM users WHERE user_id = $1";
        const values = [uid];
        const { rows } = await pool.query(query, values);

        if(rows.length === 0){
            throw new Error("User not found");
        }

        const user = rows[0];

        return { id: user.user_id, full_name: user.full_name, email: user.email, address:user.address, contact_number: user.contact_number, role: user.user_type, image: user.profile_image };
    }catch(err){
        throw new Error("Error while getting user by ID: " + err.message);
    };
};

module.exports = {
    loginUserModel,
    getUserById
};