const bcrypt = require("bcrypt");
const {User} = require("../../models");

const signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username, password);
        // Check if username already exists
        const existingUser = await User.findOne({where: {username}});
        if (existingUser) {
            return res.status(400).json({error: 'Username already exists. Please choose a different one.'});
        }
        // If username is unique, proceed with creating the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        res.status(201).json({message: 'User created successfully', user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = signup;
