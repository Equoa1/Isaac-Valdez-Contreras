const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AccessToken = require('../models/accessTokenModel'); // Verifica que esta ruta sea correcta
const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { name, phone, img_profile } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!name || !phone || !img_profile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Crea un nuevo usuario
    const user = await User.create({
      name,
      phone,
      img_profile,
    });

    // Genera un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Guarda el token en la tabla access_tokens
    await AccessToken.create({ user_id: user.id, token });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error in register endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Inicio de sesion
router.post('/login', async (req, res) => {
  try {
    const { phone, name } = req.body;

    // Verifica que los campos requeridos estén presentes
    if (!phone || !name) {
      return res.status(400).json({ message: 'Phone and name are required' });
    }

    // Busca al usuario por telefono y nombre
    const user = await User.findOne({ where: { phone, name } });

    // Verifica si el usuario existe
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Guarda el token en la tabla access_tokens
    await AccessToken.create({ user_id: user.id, token });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error in login endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
