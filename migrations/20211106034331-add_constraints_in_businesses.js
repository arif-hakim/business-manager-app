'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('businesses', {
      type: 'foreign key',
      fields: ['businessCategoryId'],
      name: 'FkBusinessCategoryIdInBusinesses',
      references: {
        table: 'business_categories',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeConstraint('businesses', 'FkBusinessCategoryIdInBusinesses')
  }
};
