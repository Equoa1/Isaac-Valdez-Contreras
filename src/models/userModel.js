const { DataTypes } = require('sequelize'); // importa DataTypes de sequelize para definir tipos de datos en los modelos
const { sequelize } = require('../config/db'); // importa la instancia de sequelize configurada desde el archivo db.js

// define el modelo User asociado a la tabla 'users' en la base de datos
const User = sequelize.define('User', {
  // nombre del usuario
  name: {
    type: DataTypes.STRING, // define el tipo de dato como string
    allowNull: false, // establece que este campo es obligatorio
  },
  // teléfono del usuario
  phone: {
    type: DataTypes.STRING, // define el tipo de dato como string
    allowNull: false, // establece que este campo es obligatorio
  },
  // imagen de perfil del usuario
  img_profile: {
    type: DataTypes.STRING, // define el tipo de dato como string
  },
}, {
  tableName: 'users', // especifica el nombre de la tabla en la base de datos
});

module.exports = User; // exporta el modelo User para que pueda ser utilizado en otras partes de la aplicación
