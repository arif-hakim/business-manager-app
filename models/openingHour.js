'use strict';
const {
  Model
} = require('sequelize')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class OpeningHour extends Model {
    static associate(models) {
      models.OpeningHour.belongsTo(models.Business, { foreignKey: 'businessId' })
    }
  };
  OpeningHour.init({
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeStart: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'OpeningHour',
    tableName: 'opening_hours',
  });
  return OpeningHour;
};