'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn('opening_hours', 'day', { type: Sequelize.INTEGER })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn('opening_hours', 'day', { type: Sequelize.STRING })
  }
};
