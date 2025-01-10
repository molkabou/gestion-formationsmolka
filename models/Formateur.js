const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('wamp_db_name', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Formateur = sequelize.define('Formateur', {
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.STRING, allowNull: false },
  matricule: { type: DataTypes.STRING, allowNull: false, unique: true },
  dateNaissance: { type: DataTypes.DATE, allowNull: false },
  numTelephone: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Formateur;
