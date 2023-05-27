const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const activite = sequelize.define('activite', {
  id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activite_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contenu: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = activite;