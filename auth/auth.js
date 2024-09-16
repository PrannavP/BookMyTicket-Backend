const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION = 2 * 24 * 60 * 60;


const generateToken = (userid) => {
    return jwt.sign({ id: userid }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }catch(err){
        throw new Error('Invalid JW Token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};