const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('wamp_db_name', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM('responsable', 'RH', 'admin', 'employe'), 
    allowNull: false 
  }
});

module.exports = User;
