const { storeTransactionDetails } = require("../models/transactionModel");

// Controller to store transaction details after payment successful
const storeTransactionDetailsController = async (req, res, next) => {
    try{
        const { product_code, signature, status, transaction_code, transaction_uuid } = req.body;

        let { total_amount } = req.body;
        
        total_amount = total_amount.replace(/,/g, '').split('.')[0];

        console.log(product_code);
        console.log(signature);
        console.log(transaction_code);
        console.log(transaction_uuid);
        console.log(total_amount);

        const transactionData = {
            product_code,
            signature,
            status,
            total_amount,
            transaction_code,
            transaction_uuid
        };

        const newTransaction = await storeTransactionDetails(transactionData);
        console.log(newTransaction);
        res.status(201).json({ newTransaction });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

module.exports = {
    storeTransactionDetailsController,
};