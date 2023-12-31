const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../config");

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.BIGINT,
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

    orderRank: {
      type: DataTypes.INTEGER
    },

    notes: {
      type: DataTypes.TEXT
    }
  },

  // Config
  {
    sequelize,
    modelName: 'todo'
  }
);

module.exports = Todo;