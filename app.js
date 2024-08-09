require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Importa Express
const { connectDB } = require('./src/config/db'); // Importa la funcion de conexión a la base de datos
const productRoutes = require('./src/routes/productRoutes'); // Importa las rutas de productos
const authRoutes = require('./src/routes/authRoutes'); // Importa las rutas de autenticacion

const app = express(); // Crea una instancia de la aplicación Express

connectDB(); // Conecta a la base de datos

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Rutas para autenticacion
app.use('/api/auth', authRoutes);
// Rutas para productos
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000; // Define el puerto en el que el servidor escuchara

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
