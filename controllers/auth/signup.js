const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../../models");
const config = require('../../config/config');

const signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        // Check if the username already exists
        const existingUser = await User.findOne({where: {username}});
        if (existingUser) {
            return res.status(400).json({error: 'Username already exists. Please choose a different one.'});
        }
        // If username is unique, proceed with creating the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});

        // Create a JWT token for the newly registered user
        const token = jwt.sign({id: user.id}, config.jwt_secret, {expiresIn: '1d'});

        // Return the user and token
        res.status(201).json({
            message: 'User created successfully. You are now logged in.',
            user: {id: user.id, username: user.username},
            token
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = signup;

