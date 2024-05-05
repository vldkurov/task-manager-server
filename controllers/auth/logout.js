const logout = (req, res) => {
    try {
        // Assuming the client will delete the token
        res.status(200).json({message: 'Logout successful, please clear your token on the client side.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = logout;



