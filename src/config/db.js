const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');


dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql', 
});

// función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // intenta autenticar la conexión
    console.log('Conectado a MySQL'); // mensaje de éxito
  } catch (error) {
    console.error('Error de conexión a MySQL:', error); // manejo de errores
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB }; 
