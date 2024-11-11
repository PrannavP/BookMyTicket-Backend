const QRCode = require("qrcode");

const generateQRCode = async (value) => {
    try{
        const qrCodeDataURL = await QRCode.toDataURL(value);
        return qrCodeDataURL;
    }catch(err){
        console.log("Error generating QR code: ", err);
        throw err;
    }
};

module.exports = {
    generateQRCode,
};