'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'state')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'city'),
      queryInterface.addColumn('users', 'state')
    ]);
  }
};
