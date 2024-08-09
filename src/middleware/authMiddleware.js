const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization'); // obtener la cabecera Authorization
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', ''); // extraer el token

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verificar el token

    const user = await User.findByPk(decoded.id); // buscar el usuario por ID

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // agregar el usuario a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
