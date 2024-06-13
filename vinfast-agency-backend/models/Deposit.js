const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Deposit = sequelize.define('Deposit', {
    DepositID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customer',
            key: 'CustomerID',
        },
    },
    CarID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Car',
            key: 'CarID',
        },
    },
    DepositAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    DepositDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'CANCELED'),
        defaultValue: 'PENDING',
    },
}, {
    tableName: 'Deposit',
    timestamps: false,
});

module.exports = Deposit;