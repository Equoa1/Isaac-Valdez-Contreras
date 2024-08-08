const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/products', auth, getProducts);
router.post('/products', auth, createProduct);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct);

module.exports = router;
