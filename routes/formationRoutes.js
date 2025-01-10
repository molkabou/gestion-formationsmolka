const express = require('express');
const Formation = require('../models/Formation'); // Import du modèle Sequelize
const router = express.Router();

// Obtenir toutes les formations
router.get('/formations', async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir une formation par ID
router.get('/formations/:id', async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id); // Sequelize
    if (!formation) return res.status(404).json({ message: 'Formation introuvable' });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer une nouvelle formation
router.post('/formations', async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json(formation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour une formation
router.put('/formations/:id', async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation introuvable' });

    await formation.update(req.body);
    res.json(formation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer une formation
router.delete('/formations/:id', async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation introuvable' });

    await formation.destroy();
    res.json({ message: 'Formation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
