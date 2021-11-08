'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayOff extends Model {
    static associate(models) {
      models.DayOff.belongsTo(models.Business, { foreignKey: 'businessId' })
    }
  };
  DayOff.init({
    nameOfDay: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dateStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'DayOff',
    tableName: 'day_offs',
  });
  return DayOff;
};