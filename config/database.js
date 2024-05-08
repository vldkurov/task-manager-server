const {Sequelize: Database} = require('sequelize');
const config = require('./config');


const sequelizeOptions = {
    host: config.db_host,
    dialect: config.db_dialect,
    logging: false,
    dialectOptions: config.useSSL ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {}
};


const sequelize = new Database(
    config.db_name,
    config.db_user,
    config.db_password,
    sequelizeOptions
);


module.exports = sequelize;
