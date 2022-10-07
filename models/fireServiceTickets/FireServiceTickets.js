'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FireServiceTickets_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FireServiceTickets_target.init({
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(255)
    }, 
    isApparatus: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    homeLocation: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    requesterName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }, 
    requestCategory: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    timeLogged: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeDispatched: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeClosed: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'FireServiceTickets',
    tableName: 'FireServiceTickets'
  });
  return FireServiceTickets_target;
};