const jwt = require('jsonwebtoken');
const { verifyToken } = require('../auth/auth');

const authMiddleware = (req, res, next) => {
    // Get the token from header
    const token = req.header('x-auth-token');

    // check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    };

    try{
        // Verify token
        const decoded = verifyToken(token);

        // Add user from payload
        req.user = decoded;
        // console.log(req.user);
        next();
    }catch(err){
        res.status(401).json({ message: 'Token is not valid.' });
    };
};

module.exports = authMiddleware;