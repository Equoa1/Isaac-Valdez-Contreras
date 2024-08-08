const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a MySQL');
  } catch (error) {
    console.error('Error de conexión a MySQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
