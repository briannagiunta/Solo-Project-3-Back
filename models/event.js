'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.event.belongsTo(models.user)
      models.event.belongsToMany(models.user, {through: 'userEvent'})
    }
  };
  event.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};