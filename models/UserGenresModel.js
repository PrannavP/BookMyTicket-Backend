// this file returns users genres
const pool = require("../config/dbConfig");

// Function to get all genres of users booked events
const getUsersGenresModel = async () => {
    try{
        const query = "SELECT u.email, array_agg(DISTINCT e.event_category) AS genres FROM users u JOIN tickets t ON u.user_id = t.booked_by JOIN event e ON t.event_id = e.id GROUP BY u.email";
        const rows = await pool.query(query);

        return rows.rows;
    }catch(err){
        throw new Error("Error getting user's genres and email: " + err.messagee);
    }
};



// Funtion to get all events according to the users past booking genres
const getEventsAccordingGenre = async (genres) => {
    try{
        const query = `SELECT * FROM event WHERE event_category = ANY($1::text[])`;
        const res = await pool.query(query, [genres]);
        return res.rows;
    }catch(err){
        console.error("Error getting events according to genre", err);
        throw new Error("Error getting events according to genre");
    }
};

module.exports = {
    getUsersGenresModel,
    getEventsAccordingGenre,
};