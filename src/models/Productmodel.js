const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Product;
