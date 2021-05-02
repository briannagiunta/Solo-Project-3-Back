'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.post)
      models.user.hasMany(models.job)
      models.user.hasMany(models.event)
      models.user.belongsToMany(models.job,{through: 'userJob'})
      models.user.belongsToMany(models.event,{through: 'userEvent'})
      
    }
  };
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    zip: DataTypes.STRING,
    hereFor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};