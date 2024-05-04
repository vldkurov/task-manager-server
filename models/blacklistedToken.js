const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const BlacklistedToken = sequelize.define('BlacklistedToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {timestamps: true, tableName: 'blacklisted_token'});

module.exports = BlacklistedToken;
