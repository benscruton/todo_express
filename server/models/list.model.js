const {DataTypes, Model} = require('sequelize');
const {sequelize} = require("../config");

class List extends Model {}

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },

  // Config
  {
    sequelize,
    modelName: 'list',
    paranoid: true  // enable soft deletion
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