'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addConstraint('legal_informations', {
      type: 'foreign key',
      fields: ['businessId'],
      name: 'FkBusinessIdInLegalInformations',
      references: {
        table: 'businesses',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeConstraint('legal_informations', 'FkBusinessIdInLegalInformations')
  }
};
