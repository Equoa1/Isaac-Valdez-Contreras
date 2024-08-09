const Product = require('../models/Productmodel');
const Joi = require('joi');
const { sequelize } = require('../config/db');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Obtiene todos los productos de la base de datos
    res.json(products); // Envía los productos como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' }); // Maneja errores
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(), // Nombre del producto, obligatorio
    description: Joi.string().required(), // Descripción del producto, obligatoria
    height: Joi.number().required(), // Altura del producto, obligatoria
    length: Joi.number().required(), // Longitud del producto, obligatoria
    width: Joi.number().required(), // Ancho del producto, obligatorio
  });

  const { error } = schema.validate(req.body); // Valida los datos de entrada
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Maneja errores de validación
  }

  try {
    const product = await Product.create(req.body); // Crea un nuevo producto
    res.status(201).json(product); // Envía el producto creado como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' }); // Maneja errores
  }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  console.log(req.body);
  // define la validacion para un solo producto
  const productSchema = Joi.object({
    id: Joi.number().required(), // id del producto, obligatorio
    name: Joi.string().required(), // nombre del producto, obligatorio
    description: Joi.string().required(), // descripción del producto, obligatoria
    height: Joi.number().required(), // altura del producto, obligatoria
    length: Joi.number().required(), // longitud del producto, obligatoria
    width: Joi.number().required(), // ancho del producto, obligatorio
  });

  // verifica si hay un array
  if (Array.isArray(req.body)) {
    const schema = Joi.array().items(productSchema); // define el esquema de validación para un batch de productos
    const { error } = schema.validate(req.body); // valida el cuerpo de la solicitud en batch
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // maneja errores de validación
    }

    try {
      const updatedProducts = [];
      for (const productData of req.body) {
        const product = await Product.findByPk(productData.id); // busca el producto por ID
        if (!product) {
          return res.status(404).json({ message: `Producto con ID ${productData.id} no encontrado` }); // maneja producto no encontrado
        }
        await product.update(productData); // actualiza el producto con los nuevos datos
        updatedProducts.push(product); // agrega el producto actualizado al array
      }
      res.json(updatedProducts); // envia los productos actualizados como respuesta
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar productos' }); // manjeo de errores
    }
  } else {
    // si el cuerpo no es un array, maneja la actualización de un solo producto
    const { error } = productSchema.validate(req.body); // valida los datos de entrada para un solo producto
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // maneja errores de validación
    }

    try {
      const product = await Product.findByPk(req.params.id); // busca el producto por ID
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado0' }); // Maneja producto no encontrado
      }
      await product.update(req.body); // actualiza el producto con los nuevos datos
      res.json(product); // envia el producto actualizado como respuesta
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar producto' }); // maneja errores
    }
  }
};


exports.deleteProduct = async (req, res) => {
  // Define un esquema de validación para un solo ID de producto
  const idSchema = Joi.object({
    id: Joi.number().required() // ID del producto, obligatorio
  });

  // Verifica si el cuerpo de la solicitud es un array
  if (Array.isArray(req.body)) {
    const schema = Joi.array().items(idSchema); // Define el esquema de validación para un batch de IDs
    const { error } = schema.validate(req.body); // Valida el cuerpo de la solicitud en batch
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // Maneja errores de validación
    }

    try {
      const ids = req.body.map(item => item.id); // Extrae los IDs de los productos a eliminar
      const products = await Product.findAll({ where: { id: ids } }); // Busca los productos por IDs
      if (products.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos para eliminar' }); // Maneja producto no encontrado
      }

      await Product.destroy({ where: { id: ids } }); // Elimina los productos
      res.json({ message: 'Productos eliminados' }); // Envía mensaje de éxito
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar productos' }); // Maneja errores
    }
  } else {
    // si el cuerpo no es un array, maneja la eliminación de un solo producto
    const { error } = idSchema.validate(req.params); // Valida el ID del producto
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // Maneja errores de validación
    }

    try {
      const product = await Product.findByPk(req.params.id); // busca el producto por ID
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' }); // maneja el producto no encontrado
      }
      await product.destroy(); 
      res.json({ message: 'Producto eliminado' }); 
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto' }); // Maneja errores
    }
  }
};

// Crear múltiples productos en batch
exports.createProductsBatch = async (req, res) => {
  console.log('Datos recibidos:', req.body); 
  const schema = Joi.array().items(Joi.object({
    name: Joi.string().required(), 
    description: Joi.string().required(), 
    height: Joi.number().required(), 
    length: Joi.number().required(), 
    width: Joi.number().required(), 
  }));

  const { error } = schema.validate(req.body); // valida los datos de entrada
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // maneja errores de validación
  }

  try {
    const products = await Product.bulkCreate(req.body); // crea múltiples productos en batch
    res.status(201).json(products); // envía los productos creados como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al crear productos en batch' }); // maneja errores
  }
};




