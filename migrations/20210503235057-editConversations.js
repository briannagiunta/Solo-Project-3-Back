'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('conversations', 'userId'),
      queryInterface.removeColumn('conversations', 'userId2'),
      queryInterface.addColumn('conversations', 'usernames', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('conversations', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('conversations', 'userId2', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.removeColumn('conversations', 'usernames'),
    ]);
  }
};
