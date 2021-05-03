'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.friendship.belongsTo(models.user, {foreignKey: 'userId', constraints: false})
      models.friendship.belongsTo(models.user, {as: "friend", foreignKey: 'userId2', constraints:false})
    }
  };
  friendship.init({
    userId: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'friendship',
  });
  return friendship;
};

