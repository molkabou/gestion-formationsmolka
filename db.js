const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wamp_db_name', 'root', '', {
  host: 'localhost', // Adresse de WAMP
  dialect: 'mysql',  // Type de base de données
  logging: false     // Désactive les logs SQL dans la console
});

sequelize.authenticate()
  .then(() => console.log('Connexion réussie à la base MySQL'))
  .catch(err => console.error('Erreur de connexion à MySQL :', err));

module.exports = sequelize;
