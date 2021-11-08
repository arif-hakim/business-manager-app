'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opening_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeStart: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      timeEnd: {
        type: Sequelize.TIME,
        allowNull: false,
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
    
    await queryInterface.addIndex('opening_hours', ['businessId'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('opening_hours')
  }
}