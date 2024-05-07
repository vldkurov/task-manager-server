const {User} = require("../models");

async function fetchUserDetails(userId) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null; // or handle as you see fit, maybe throw an error
        }
        return user; // This might be the full user object; consider what you want to return
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error; // Rethrow or handle error appropriately
    }
}

module.exports = fetchUserDetails;
