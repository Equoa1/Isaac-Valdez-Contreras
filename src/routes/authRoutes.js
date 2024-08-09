const express = require('express'); // importa el modulo express para manejar rutas y solicitudes 
const jwt = require('jsonwebtoken'); // importa jsonwebtoken para crear y verificar tokens JWT
const User = require('../models/userModel'); // importa el modelo interactuar con la tabla 'users' en la base de datos
const AccessToken = require('../models/accessTokenModel'); // importa el modelo AccessToken para interactuar con la tabla 'access_tokens' en la base de datos
const router = express.Router(); // crea un enrutador de express para definir rutas y manejadores de solicitudes


// registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { name, phone, img_profile } = req.body;

    // verifica que todos los campos requeridos estén presentes
    if (!name || !phone || !img_profile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // crea un nuevo usuario
    const user = await User.create({
      name,
      phone,
      img_profile,
    });

    // genera un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // guarda el token en la tabla access_tokens
    await AccessToken.create({ user_id: user.id, token });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error in register endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// inicio de sesion
router.post('/login', async (req, res) => {
  try {
    const { phone, name } = req.body;

    // verifica que los campos requeridos estén presentes
    if (!phone || !name) {
      return res.status(400).json({ message: 'Phone and name are required' });
    }

    // busca al usuario por telefono y nombre
    const user = await User.findOne({ where: { phone, name } });

    // verifica si el usuario existe
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // genera un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // guarda el token en la tabla access_tokens
    await AccessToken.create({ user_id: user.id, token });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error in login endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
