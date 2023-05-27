const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const listenlist = sequelize.define('listenlist', {
  id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_album: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nom_album: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_album: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = listenlist;