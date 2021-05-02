'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('jobs', 'city'),
      queryInterface.removeColumn('jobs', 'state')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('jobs', 'city'),
      queryInterface.addColumn('jobs', 'state')
    ]);
  }
};
