const { generateQRCode } = require("../services/qrgenerator");
const { getTxnUuidById } = require("../models/QRCodeModel");

const generateQRCodeController = async (req, res) => {
    try{
        const user_id = req.body.user_id;

        // console.log(user_id);

        const txnUuid = await getTxnUuidById(user_id);
        // console.log(txnUuid.transaction_uuid);

        if(!txnUuid){
            return res.status(404).json({ error: "Transaction not found." });
        }

        // generate the qr code using the txnid
        const qrCodeDataURL = await generateQRCode(txnUuid.transaction_uuid);

        res.status(200).json({ qrCodeDataURL });
    }catch(err){
        res.status(500).json({ error: "Error generating qr code in qrcontroller." })
    }
};

module.exports = {
    generateQRCodeController,
};