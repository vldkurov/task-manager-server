const BlacklistedToken = require('../models/blacklistedToken');

// Middleware to check token validity
const checkTokenValidity = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header
        if (!token) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        // Check if token is blacklisted
        const isTokenBlacklisted = await BlacklistedToken.findOne({where: {token}});
        if (isTokenBlacklisted) {
            return res.status(401).json({error: 'Token revoked. Please log in again.'});
        }
        // Token is valid
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = checkTokenValidity
