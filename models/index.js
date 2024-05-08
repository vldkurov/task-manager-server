const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task')

// User and Task associations
User.hasMany(Task, {foreignKey: 'userId', as: 'tasks'});
Task.belongsTo(User, {foreignKey: 'userId', as: 'user'});


module.exports = {
    sequelize,
    User,
    Task
};
