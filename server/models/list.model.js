const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../config");

class List extends Model {}

List.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    orderRank: {
      type: DataTypes.INTEGER
    }
  },

  // Config
  {
    sequelize,
    modelName: 'list'
  }
);

// Join with Todos
const Todo = require("./todo.model");
List.hasMany(Todo, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Todo.belongsTo(List);

module.exports = List;