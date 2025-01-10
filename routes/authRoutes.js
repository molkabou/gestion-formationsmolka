const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import du modèle Sequelize

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } }); // Sequelize
    if (!user) {
      return res.status(401).json({ message: 'Nom d’utilisateur ou mot de passe invalide' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nom d’utilisateur ou mot de passe invalide' });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      'your_secret_key', // Changez cela pour un secret sécurisé
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
