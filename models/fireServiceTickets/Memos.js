'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memos_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Memos_target.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    requestId: {
      type: DataTypes.NUMBER
    },
    author: {
      type: DataTypes.STRING(255)
    },
    memoDateTime: {
      type: DataTypes.DATE
    }, 
    memo: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'Memos',
    modelName: 'Memos',
  });
  return Memos_target;
};