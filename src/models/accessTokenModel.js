const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');

const AccessToken = sequelize.define('AccessToken', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

AccessToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AccessToken;
