const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
    },
    status: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed'),
        defaultValue: 'pending'
    },
    dueDate: {
        type: DataTypes.DATE
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {timestamps: true, tableName: 'tasks'})

module.exports = Task
