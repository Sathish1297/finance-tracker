const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Stock = require('./stock');

const Portfolio = sequelize.define('Portfolio', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

Stock.hasMany(Portfolio);
Portfolio.belongsTo(Stock);

module.exports = Portfolio;
