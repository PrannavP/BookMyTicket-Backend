const pool = require("../config/dbConfig");

const getTxnUuidById = async (user_id) => {
    try{
        const query = "SELECT transaction_uuid FROM transactions WHERE booked_by = $1";
        const values = [user_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }catch(err){
        throw new Error("Error while selecting user transactions from transactions.");
    }
};

module.exports = {
    getTxnUuidById,
}