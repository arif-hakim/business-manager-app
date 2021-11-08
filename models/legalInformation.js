'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LegalInformation extends Model {
    static associate(models) {
      // define association here
    }
  };
  LegalInformation.init({
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headOfCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ustId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'LegalInformation',
    tableName: 'legal_informations',
  });
  return LegalInformation;
};