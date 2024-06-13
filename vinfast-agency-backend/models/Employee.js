const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Employee = sequelize.define('Employee', {
    EmployeeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    EmployeeName: {
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
    AgencyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Agency',
            key: 'AgencyID',
        },
    },
    Role: {
        type: DataTypes.ENUM('ADMIN', 'SALES', 'STAFF'),
        defaultValue: 'STAFF',
    },
}, {
    tableName: 'Employee',
    timestamps: false,
});

module.exports = Employee;