const express = require('express');// Importa el módulo Express
const {
  getProducts, // Importa la funcion para obtener todos los productos
  createProduct,// Importa la funcioon para crear un nuevo producto
  updateProduct,// Importa la funcion para actualizar un producto
  deleteProduct,// Importa la función para eliminar un producto
  createProductsBatch,// Importa la funcion para crear múltiples productos
  updateProductsBatch,
} = require('../controllers/productController'); // Importa las funciones del controlador de productos
const auth = require('../middleware/authMiddleware');// Importa el middleware de autenticación para proteger las rutas


const router = express.Router();// Crea un nuevo enrutador de Express

// Obtener todos los productos
router.get('/products', auth, getProducts);

// Crear un nuevo producto
router.post('/products', auth, createProduct);

// Actualizar un producto
router.put('/products/:id', auth, updateProduct);

// Eliminar un producto
router.delete('/products/:id', auth, deleteProduct);

// Crear multiples productos en batch
router.post('/products/batch', auth, createProductsBatch);

const productController = require('../controllers/productController');
router.put('/products/batch', auth, productController.updateProductsBatch);


module.exports = router;
