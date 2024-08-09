const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

// Define el modelo de AccessToken
const AccessToken = sequelize.define('AccessToken', {
  // ID del usuario asociado al token
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // No puede ser nulo
  },
  // Token de acceso
  token: {
    type: DataTypes.TEXT,
    allowNull: false, // No puede ser nulo
  },
}, {
  tableName: 'access_tokens', // Nombre de la tabla en la base de datos
});

module.exports = AccessToken; // Exporta el modelo para usarlo en otras partes de la aplicacion
