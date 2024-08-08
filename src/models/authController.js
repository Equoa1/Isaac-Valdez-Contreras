const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AccessToken = require('../models/accessTokenModel');

exports.login = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const user = await User.findOne({ where: { name, phone } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await AccessToken.create({ user_id: user.id, token });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
