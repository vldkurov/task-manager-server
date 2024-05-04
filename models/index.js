const sequelize = require('../config/database');
const User = require('./user');
const BlacklistedToken = require('../models/blacklistedToken');


module.exports = {
    sequelize,
    User,
    BlacklistedToken
};
