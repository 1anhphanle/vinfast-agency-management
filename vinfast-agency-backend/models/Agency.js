const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Agency = sequelize.define('Agency', {
    AgencyID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    AgencyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Address: {
        type: DataTypes.TEXT,
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
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Agency',
    timestamps: false,
});

module.exports = Agency;