const config = require('../../config/config');
const jwt = require("jsonwebtoken");
const fetchUserDetails = require("../../utils/fetchUserDetails");


const validate = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];  // Split the 'Bearer' from the token
    if (!token) {
        return res.status(401).json({message: 'Token not found'});
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        const user = await fetchUserDetails(decoded.id);  // Await the resolution of the promise

        res.json({token, user: {id: user.id, username: user.username}});  // Send the user data in response
    } catch (err) {
        console.log(err);
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: 'Invalid token'});
        }
        return res.status(500).json({message: 'Failed to authenticate token'});
    }
}


module.exports = validate
