const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define el modelo de User
const User = sequelize.define('User', {
  // Nombre del usuario
  name: {
    type: DataTypes.STRING,
    allowNull: false, // No puede ser nulo
  },
  // Teléfono del usuario
  phone: {
    type: DataTypes.STRING,
    allowNull: false, // No puede ser nulo
  },
  // Imagen de perfil del usuario
  img_profile: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
});

module.exports = User; // Exporta el modelo para usarlo en otras partes de la aplicacion
