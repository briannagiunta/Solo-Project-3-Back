'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.message.belongsTo(models.user)
      models.message.belongsTo(models.conversation)
    }
  };
  message.init({
    userId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};