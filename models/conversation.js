'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.conversation.belongsToMany(models.user,{through: 'userConversation' })
      models.conversation.hasMany(models.message)
    }
  };
  conversation.init({
    usernames: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'conversation',
  });
  return conversation;
};