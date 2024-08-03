const pool = require('../config/dbConfig');

// function to register new user
const registerNewUser = async (userData) => {
    try{
        const query = "INSERT INTO users (full_name, email, password, contact_number, address, age) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [userData.full_name, userData.email, userData.password, userData.contact_number, userData.address, userData.age];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }catch(err){
        throw new Error('Error registering user: ' + err.message);
    };
};

module.exports = {
    registerNewUser,
};