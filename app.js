require('dotenv').config(); // carga las variables de entorno desde el archivo .env
const express = require('express'); // importa Express
const { connectDB } = require('./src/config/db'); // importa la funcion de conexión a la base de datos
const productRoutes = require('./src/routes/productRoutes'); // importa las rutas de productos
const authRoutes = require('./src/routes/authRoutes'); // importa las rutas de autenticacion

const app = express(); // crea una instancia de la aplicación Express

connectDB(); // conecta a la base de datos

app.use(express.json()); // usa el middleware json para convertirlo a json

// Rutas para autenticacion
app.use('/api/auth', authRoutes);
// Rutas para productos
app.use('/api', productRoutes);


const PORT = process.env.PORT || 5000; // Define el puerto 5000

// inicia el servidor con el puerto asignado
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
