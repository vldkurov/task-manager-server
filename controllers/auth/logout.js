const {BlacklistedToken} = require("../../models");

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header
        if (!token) {
            return res.status(400).json({error: 'Token not provided'});
        }
        // Add token to blacklist
        await BlacklistedToken.create({token});
        res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = logout;
