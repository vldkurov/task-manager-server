const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authentication token required'});
    }

    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, config.jwt_secret);  // Attach the decoded user data to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Authentication error:', err.message);
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: 'Invalid or expired token'});
        }
        return res.status(500).json({message: 'Failed to authenticate token'});
    }
};

module.exports = authMiddleware;
