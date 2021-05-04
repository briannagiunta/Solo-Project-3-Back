'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userConversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userConversation.init({
    userId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userConversation',
  });
  return userConversation;
};