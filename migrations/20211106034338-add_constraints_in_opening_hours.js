'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('opening_hours', {
      fields: ['businessId'],
      type: 'foreign key',
      name: 'FkBusinessIdInOpeningHours',
      references: {
        table: 'businesses',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeConstraint('opening_hours', 'FkBusinessIdInOpeningHours')
  }
};
