'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      // models.Business.hasOne(models.BusinessCategory, { foreignKey: 'businessCategoryId' })
      models.Business.hasOne(models.LegalInformation, { foreignKey: 'businessId' })
      models.Business.hasMany(models.OpeningHour, { foreignKey: 'businessId' })
      models.Business.hasMany(models.DayOff, { foreignKey: 'businessId' })
    }
  };
  Business.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.STRING,
    businessCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: DataTypes.STRING(14),
    email: DataTypes.STRING(150),
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING(150),
    postalCode: DataTypes.STRING(10),
    logo: {
      type: DataTypes.STRING,
    },
    commercialImage: {
      type: DataTypes.STRING,
    },
  }, {
    getterMethods: {
      logo: function () {
        let dir = 'assets/uploads/logo'  
        return `${dir}/${this.getDataValue('logo')}`
      },
      commercialImage: function () {
        let dir = 'assets/uploads/commercial_images'  
        return `${dir}/${this.getDataValue('commercialImage')}`
      }
    },
    timestamps: true,
    sequelize,
    modelName: 'Business',
    tableName: 'businesses',
  });
  return Business;
};