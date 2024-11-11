const bcrypt = require("bcryptjs");
const pool = require("../config/dbConfig");

// function to register organizer
const registerNewOrganizer = async (organizerData) => {
    try{
        const hashedPassword = await bcrypt.hash(organizerData.password, 10);

        const query = "INSERT INTO organizers (organizer_name, contact, email, password, address, profile_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [organizerData.organizer_name, organizerData.contact, organizerData.email, hashedPassword, organizerData.address, organizerData.profile_image];
        const { rows } = await pool.query(query, values);
        // console.log(rows);
        return rows[0];
    }catch(err){
        throw new Error("Error registering organizer: " + err.message);
    }
};

// function to get events by organizer
const getEventsByOrganizer = async (organizerName) => {
    try{
        const query = "SELECT * FROM event WHERE event_organizer = $1";
        const values = [organizerName];
        const { rows } = await pool.query(query, values);

        return rows;
    }catch(err){
        throw new Error("Error fetching events: " + err.message);
    }
};

module.exports = {
    registerNewOrganizer,
    getEventsByOrganizer,
}