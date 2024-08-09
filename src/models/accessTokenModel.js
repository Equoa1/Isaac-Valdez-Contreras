const { DataTypes } = require('sequelize');//importamos el datatypes
const { sequelize } = require('../config/db.js');// y el sequelize para el manejo de la base datos

// define el modelo de AccessToken
const AccessToken = sequelize.define('AccessToken', {
  // ID del usuario asociado al token
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // no puede ser nulo
  },
  // token de acceso
  token: {
    type: DataTypes.TEXT,
    allowNull: false, // no puede ser nulo
  },
}, {
  tableName: 'access_tokens', // nombre de la tabla en la base de datos
});

module.exports = AccessToken; // exporta el modelo para usarlo en otras partes de la aplicacion
