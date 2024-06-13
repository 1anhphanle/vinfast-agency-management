// models/Customer.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Customer = sequelize.define('Customer', {
    CustomerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CustomerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Address: {
        type: DataTypes.TEXT,
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Customer',
    timestamps: false,
});

module.exports = Customer;