'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('events', 'city'),
      queryInterface.removeColumn('events', 'state')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('events', 'city'),
      queryInterface.addColumn('events', 'state')
    ]);
  }
};
