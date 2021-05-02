'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('events', 'zip', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('jobs', 'zip', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'zip', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    ]);
  },
  
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('events', 'zip'),
      queryInterface.removeColumn('jobs', 'zip'),
      queryInterface.removeColumn('users', 'zip')
    ]);
  }
};
