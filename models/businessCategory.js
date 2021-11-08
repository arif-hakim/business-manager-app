'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessCategory extends Model {
    // static associate(models) {
    //   models.BusinessCategory.hasMany(models.Business, { foreignKey: 'businessCategoryId' })
    // }
  }
  BusinessCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'BusinessCategory',
    tableName: 'business_categories',
    operatorsAliases: 0
  })
  return BusinessCategory
}