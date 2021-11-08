'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('day_offs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameOfDay: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      dateStart: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      dateEnd: {
        type: Sequelize.DATEONLY,
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
    
    await queryInterface.addIndex('day_offs', ['businessId'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('day_offs')
  }
};