const pool = require('../config/dbConfig');

// Function to get all events
const getAllEvents = async () => {
  try {
    const query = 'SELECT * FROM event';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching events: ' + error.message);
  }
};

module.exports = {
  getAllEvents,
};