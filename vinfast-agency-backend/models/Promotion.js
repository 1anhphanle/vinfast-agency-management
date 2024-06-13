const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.development);

const Promotion = sequelize.define('Promotion', {
    PromotionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    PromotionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
    },
    Discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'Promotion',
    timestamps: false,
});

module.exports = Promotion;