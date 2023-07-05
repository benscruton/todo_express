const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../config");

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false
    },

    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    dueDate: {
      type: DataTypes.DATE
    },

    deletedAt: {
      type: DataTypes.DATE
    }

  },
  // Config
  {
    sequelize,
    modelName: 'Todo'
  }
);

module.exports = Todo;