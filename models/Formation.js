const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Changez cela si vous utilisez une autre base de données
});

const Formation = sequelize.define('Formation', {
    titre: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    domaine: { type: DataTypes.STRING, allowNull: false },
    duree: { type: DataTypes.INTEGER, allowNull: false },
    dateDebut: { type: DataTypes.DATE, allowNull: false },
    dateFin: { type: DataTypes.DATE, allowNull: false },
    prix: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Formation;
