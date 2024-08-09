const express = require('express');// importa el modulo Express y importa las funciones
const {
  getProducts, 
  createProduct,
  updateProduct,
  deleteProduct,
  createProductsBatch,
} = require('../controllers/productController'); 
const auth = require('../middleware/authMiddleware');


const router = express.Router();// crea un ruteador express

// obtener todos los productos
router.get('/products', auth, getProducts);

// crear un nuevo producto
router.post('/products', auth, createProduct);

// actualizar un producto
router.put('/products/:id', auth, updateProduct);

// eliminar un producto
router.delete('/products/:id', auth, deleteProduct);

// crear multiples productos en batch
router.post('/products/batch', auth, createProductsBatch);
module.exports = router;
