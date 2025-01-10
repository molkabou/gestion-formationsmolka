const express = require('express');
const Formateur = require('../models/Formateur'); // Import du modèle Sequelize
const router = express.Router();

// Obtenir tous les formateurs
router.get('/', async (req, res) => {
  try {
    const formateurs = await Formateur.findAll();
    res.json(formateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir un formateur par ID
router.get('/:id', async (req, res) => {
  try {
    const formateur = await Formateur.findByPk(req.params.id); // Sequelize
    if (!formateur) return res.status(404).json({ message: 'Formateur introuvable' });
    res.json(formateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un nouveau formateur
router.post('/', async (req, res) => {
  try {
    const formateur = await Formateur.create(req.body);
    res.status(201).json(formateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un formateur
router.put('/:id', async (req, res) => {
  try {
    const formateur = await Formateur.findByPk(req.params.id);
    if (!formateur) return res.status(404).json({ message: 'Formateur introuvable' });

    await formateur.update(req.body);
    res.json(formateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un formateur
router.delete('/:id', async (req, res) => {
  try {
    const formateur = await Formateur.findByPk(req.params.id);
    if (!formateur) return res.status(404).json({ message: 'Formateur introuvable' });

    await formateur.destroy();
    res.json({ message: 'Formateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
