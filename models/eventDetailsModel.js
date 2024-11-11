const pool = require("../config/dbConfig");;

// function to get event tickets sold (for organizers)
const getEventTicketsSold = async(eventOrganizerEmail) => {
    try{
        console.log(eventOrganizerEmail);
        const query = `SELECT e.event_total_tickets, e.event_remaining_tickets, e.event_name 
                        FROM event e JOIN organizers o on e.event_organizer = o.organizer_name WHERE o.email = $1`;
        const values = [eventOrganizerEmail];
        const rows = await pool.query(query, values);
        return rows.rows;
    }catch(err){
        throw new Error("Error while getting event tickets sold data.");
    }
};

module.exports = {
    getEventTicketsSold,
}