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
      type: DataTypes.TEXT,
      allowNull: false
    },

    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    dueDate: {
      type: DataTypes.DATE
    },

    notes: {
      type: DataTypes.TEXT
    }
  },

  // Config
  {
    sequelize,
    modelName: 'todo',
    paranoid: true
  }
);

module.exports = Todo;