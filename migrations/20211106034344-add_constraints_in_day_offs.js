'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addConstraint('day_offs', {
      fields: ['businessId'],
      type: 'foreign key',
      name: 'FkBusinessIdInDayOffs',
      references: {
        table: 'businesses',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeConstraint('day_offs', 'FkBusinessIdInDayOffs')
  }
};
