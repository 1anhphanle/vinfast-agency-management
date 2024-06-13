const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Car = sequelize.define('Car', {
    CarID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ModelName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Color: {
        type: DataTypes.STRING,
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Image: {
        type: DataTypes.STRING,
    },
    Description: {
        type: DataTypes.TEXT,
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Car',
    timestamps: false,
});

module.exports = Car;