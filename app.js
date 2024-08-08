const express = require('express');
const { connectDB } = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');


const app = express();

connectDB();

app.use(express.json());


app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
