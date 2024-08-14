const sequelize = require('../config/database');
const User = require('./user');
const Stock = require('./stock');
const Portfolio = require('./portfolio');

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

Stock.hasMany(Portfolio);
Portfolio.belongsTo(Stock);

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  User,
  Stock,
  Portfolio,
  syncDB,
};
