const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
