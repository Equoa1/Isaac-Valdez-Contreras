
require('dotenv').config();


console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : '(Not Set)');
console.log('DB_HOST:', process.env.DB_HOST);

// Importar los módulos necesarios
const { Sequelize } = require('sequelize');
const Product = require('../models/Productmodel'); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
});


const testGetProducts = async () => {
  try {
    const products = await Product.findAll();
    console.log('Productos obtenidos:', products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};


const testCreateProduct = async () => {
  const newProduct = {
    name: 'Producto de prueba',
    description: 'Descripción del producto de prueba',
    height: 10,
    length: 20,
    width: 30,
  };

  try {
    const product = await Product.create(newProduct);
    console.log('Producto creado:', product);
  } catch (error) {
    console.error('Error al crear producto:', error);
  }
};


const testUpdateProduct = async () => {
  const productId = 1; 
  const updatedData = {
    name: 'Producto actualizado',
    description: 'Descripción actualizada del producto',
    height: 15,
    length: 25,
    width: 35,
  };

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update(updatedData);
      console.log('Producto actualizado:', product);
    } else {
      console.log('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
  }
};


const testUpdateProductsBatch = async () => {
  const fixedProducts = [
    {
      id: 5,
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      height: 10,
      length: 20,
      width: 30,
    },
    {
      id: 6,
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      height: 15,
      length: 25,
      width: 35,
    },
  ];

  try {
    const updatedProducts = [];
    for (const productData of fixedProducts) {
      const product = await Product.findByPk(productData.id);
      if (product) {
        await product.update(productData); 
        updatedProducts.push(product);
      }
    }
    console.log('Productos actualizados:', updatedProducts); 
  } catch (error) {
    console.error('Error al actualizar productos:', error); 
  }
};


const testDeleteProduct = async () => {
  const productId = 1; 

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      console.log('Producto eliminado:', product);
    } else {
      console.log('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};


const testDeleteProductsBatch = async () => {
  const productIds = [5, 6]; 

  try {
    const deletedProducts = [];
    for (const id of productIds) {
      const product = await Product.findByPk(id);
      if (product) {
        await product.destroy();
        deletedProducts.push(product);
      }
    }
    console.log('Productos eliminados:', deletedProducts);
  } catch (error) {
    console.error('Error al eliminar productos en batch:', error);
  }
};


sequelize.authenticate().then(async () => {
  console.log('Conectado a la base de datos.');

  await testGetProducts();
  await testCreateProduct();
  await testUpdateProduct();
  await testUpdateProductsBatch();
  await testDeleteProduct();
  await testDeleteProductsBatch();


  await sequelize.close();
  console.log('Conexión cerrada.');
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});
