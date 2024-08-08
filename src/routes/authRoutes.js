const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, phone, img_profile, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      img_profile,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error in register endpoint:', error); // Agregar un registro de error más específico
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/login', async (req, res) => {
    try {
      const { phone, password } = req.body;
  
      if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
      }
  
      const user = await User.findOne({ where: { phone } });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error in login endpoint:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
