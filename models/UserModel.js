const bcrypt = require("bcryptjs");
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

// function to get active tickets of user
const getUserActiveTicketDetails = async(userID) => {
    try{
        const query = "SELECT COUNT(*) FROM tickets WHERE booked_by = $1";
        const values = [userID.userId];
        // console.log(eventID);
        const rows = await pool.query(query, values);
        return rows.rows[0].count;
    }catch(err){
        throw new Error("Error while counting rows of active tickets", err.message);
    };
};

// function to get total upcoming booked events of user
const getUserUpcomingEventDetails = async(userID) => {
    try{
        const query = "SELECT COUNT (DISTINCT event_id) FROM tickets WHERE booked_by = $1";
        const values = [userID.userId];
        const rows = await pool.query(query, values);
        return rows.rows[0].count;
    }catch(err){
        throw new Error("Error while getting upcoming event details of attendees.", err.message);
    };
};

// Function to get total spend by the user
const getTotalMoneySpentByUsers = async(userID) => {
    try{
        const query = "SELECT SUM(total_price) FROM tickets WHERE booked_by = $1";
        const values = [userID.userId];
        const rows = await pool.query(query, values);
        return Math.floor(rows.rows[0].sum);
    }catch(err){
        throw new Error("Error while calculating total money spent by the user.", err.message);
    };
};

module.exports = {
    registerNewUser,
    getUserActiveTicketDetails,
    getUserUpcomingEventDetails,
    getTotalMoneySpentByUsers
};