// this file returns users genres
const pool = require("../config/dbConfig");

// Function to get all genres of users booked events
const getUsersGenresModel = async (userID) => {
    try{
        const query = "SELECT event_category FROM event WHERE id IN (SELECT event_id FROM tickets WHERE booked_by = $1)";
        const values = [userID.userId];
        const rows = await pool.query(query, values);

        // Extract and split event categories
        const categories = rows.rows.flatMap(row => row.event_category.split(', '));
        console.log(categories);
        return categories;
    }catch(err){
        throw new Error("Error getting users genre" + err.message);
    }
};

module.exports = {
    getUsersGenresModel
};