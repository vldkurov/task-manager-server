const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../../models");
const config = require('../../config/config');

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
        const token = jwt.sign({id: user.id}, config.jwt_secret, {expiresIn: '1d'});
        res.status(200).json({message: 'Login successful', user: {id: user.id, username: user.username}, token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = login
