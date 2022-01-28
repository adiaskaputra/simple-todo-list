'use strict';
const {
  Model
} = require('sequelize');
const { PRIORITY_TEXT, PRIORITY_CODE } = require('../constants/PRIORITY')

module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todos.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5
      },
      set(code) {
        if (typeof code != 'number') {
          this.setDataValue('priority', PRIORITY_CODE[code]);
        } else this.setDataValue('priority', code);
      },
      get() {
        const code = this.getDataValue('priority');
        return PRIORITY_TEXT[code]
      }
    },
  }, {
    sequelize,
    modelName: 'todos',
  });

  todos.associate = function (models) {
    todos.belongsTo(models.activities, { foreignKey: 'activity_group_id' });
  };

  return todos;
};