const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Transaction = sequelize.define('Transaction', {
    TransactionID: {
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
    AgencyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Agency',
            key: 'AgencyID',
        },
    },
    TransactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'COMPLETED', 'CANCELED'),
        defaultValue: 'PENDING',
    },
}, {
    tableName: 'Transaction',
    timestamps: false,
});

module.exports = Transaction;