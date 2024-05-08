// require('dotenv').config({path: '../.env'});
require('dotenv').config();

const environments = {
    development: {
        // server
        port: process.env.PORT,
        // database
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,
        db_host: process.env.DB_HOST,
        db_dialect: process.env.DB_DIALECT,
        useSSL: false,
        // jwt
        jwt_secret: process.env.JWT_SECRET,
    },
    production: {
        // server
        port: process.env.PORT,
        // database
        db_name: process.env.DB_NAME_PRODUCTION,
        db_user: process.env.DB_USER_PRODUCTION,
        db_password: process.env.DB_PASSWORD_PRODUCTION,
        db_host: process.env.DB_HOST_PRODUCTION,
        db_dialect: process.env.DB_DIALECT_PRODUCTION,
        useSSL: true,
        // jwt
        jwt_secret: process.env.JWT_SECRET,
    },
    // other environments...
};

const env = process.env.NODE_ENV || 'development';

module.exports = environments[env];
