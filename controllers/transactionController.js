const { storeTransactionDetails } = require("../models/transactionModel");

// Controller to store transaction details after payment successful
const storeTransactionDetailsController = async (req, res, next) => {
    try{
        const { product_code, signature, status, transaction_code, transaction_uuid, booked_by } = req.body;

        let { total_amount } = req.body;
        
        total_amount = total_amount.replace(/,/g, '').split('.')[0];

        const transactionData = {
            product_code,
            signature,
            status,
            total_amount,
            transaction_code,
            transaction_uuid,
            booked_by,
        };

        const newTransaction = await storeTransactionDetails(transactionData);
        res.status(201).json({ newTransaction });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    storeTransactionDetailsController,
};