const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const abonne = sequelize.define('abonne', {
  id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_artist: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nom_artiste: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_artiste: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = abonne;