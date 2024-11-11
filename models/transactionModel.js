const pool = require("../config/dbConfig");

// function to store transaction details which came from esewa after successful payment
const storeTransactionDetails = async (transactionData) => {
    try{
        const query = "INSERT INTO transactions (product_code, signature, status, total_amount, transaction_code, transaction_uuid, booked_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [transactionData.product_code, transactionData.signature, transactionData.status, transactionData.total_amount, transactionData.transaction_code, transactionData.transaction_uuid, transactionData.booked_by];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }catch(err){
        console.log(err);
        throw new Error("Error while inserting transaction details in DB.", err);
    }
};

module.exports = {
    storeTransactionDetails,
};