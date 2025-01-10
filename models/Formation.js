const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('wamp_db_name', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Formation = sequelize.define('Formation', {
  titre: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  domaine: { type: DataTypes.STRING, allowNull: false },
  duree: { type: DataTypes.INTEGER, allowNull: false },
  dateDebut: { type: DataTypes.DATE, allowNull: false },
  dateFin: { type: DataTypes.DATE, allowNull: false },
  formateur: { type: DataTypes.STRING, allowNull: false },
  participants: { type: DataTypes.JSON, defaultValue: [] },
  prix: { type: DataTypes.FLOAT, allowNull: false },
  lieu: { type: DataTypes.STRING }
});

module.exports = Formation;
