'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('legal_informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      headOfCompany: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taxNumber: {
        type: Sequelize.STRING,
      },
      ustId: {
        type: Sequelize.STRING,
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    
    await queryInterface.addIndex('legal_informations', ['businessId'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('legal_informations')
  }
}