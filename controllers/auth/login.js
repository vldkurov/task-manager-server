const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../../models");


const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({error: 'Invalid password'});
        }
        const token = jwt.sign({id: user.id}, 'your_secret_key');
        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = login
