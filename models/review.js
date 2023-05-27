const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const review = sequelize.define('review', {
  identifiant: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pseudo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pronoms: {
    type: DataTypes.STRING,
    allowNull: true
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = userbox;