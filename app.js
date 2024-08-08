const express = require('express');
const { connectDB } = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

connectDB();

app.use(express.json());

// Asegúrate de que el prefijo 'api' sea el mismo que el que usas en el comando curl
app.use('/api', authRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
