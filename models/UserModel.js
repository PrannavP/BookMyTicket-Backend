const bcrypt = require("bcryptjs");
const path = require('path');
const pool = require('../config/dbConfig');

// function to register new user
const registerNewUser = async (userData) => {
    try {
        // hashing the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const query = "INSERT INTO users (full_name, email, password, contact_number, address, age, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [userData.full_name, userData.email, hashedPassword, userData.contact_number, userData.address, userData.age, userData.profile_image];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (err) {
        throw new Error('Error registeringggg user: ' + err.message);
    }
};

module.exports = {
    registerNewUser,
};