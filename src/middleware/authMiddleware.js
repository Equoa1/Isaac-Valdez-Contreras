const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener la cabecera Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extraer el token de la cabecera Authorization
    const token = authHeader.replace('Bearer ', '');

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario por el ID del token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Agregar el usuario al objeto de solicitud
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
