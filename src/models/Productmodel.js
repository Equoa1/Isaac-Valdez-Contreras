const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define el modelo de Product
const Product = sequelize.define('Product', {
  // Nombre del producto
  name: {
    type: DataTypes.STRING,
    allowNull: false, // No puede ser nulo
  },
  // Descripción del producto
  description: {
    type: DataTypes.STRING,
    allowNull: false, // No puede ser nulo
  },
  // Altura del producto
  height: {
    type: DataTypes.FLOAT,
    allowNull: false, // No puede ser nulo
  },
  // Longitud del producto
  length: {
    type: DataTypes.FLOAT,
    allowNull: false, // No puede ser nulo
  },
  // Ancho del producto
  width: {
    type: DataTypes.FLOAT,
    allowNull: false, // No puede ser nulo
  },
}, {
  tableName: 'catalog_products', // Nombre de la tabla en la base de datos
  timestamps: true, // Agrega campos de timestamps (createdAt y updatedAt)
});

module.exports = Product; // Exporta el modelo para usarlo en otras partes de la aplicacion
