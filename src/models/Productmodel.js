
const { DataTypes } = require('sequelize');// importa DataTypes de sequelize para definir tipos de datos en los modelos
const { sequelize } = require('../config/db');// importa la instancia de sequelize configurada desde el archivo db.js

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
  tableName: 'catalog_products', // nombre de la tabla
  timestamps: true, // agrega campos de timestamps para que cuando se haga un registro marque el tiempo registrado
});

module.exports = Product; // cxporta el modelo para usarlo en otras partes de la aplicacion
