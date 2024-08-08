const jwt = require('jsonwebtoken');
const AccessToken = require('../models/accessTokenModel');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = await AccessToken.findOne({ where: { token } });
    if (!accessToken) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
