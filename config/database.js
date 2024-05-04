const {Sequelize: Database} = require('sequelize');
const config = require('./config');

const useSSL = process.env.NODE_ENV === 'production';


const sequelizeOptions = {
    host: config.db_host,
    dialect: config.db_dialect,
    logging: false,
};


if (useSSL) {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Database(
    config.db_name,
    config.db_user,
    config.db_password,
    sequelizeOptions
);

module.exports = sequelize;
