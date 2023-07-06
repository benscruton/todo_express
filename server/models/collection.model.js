const {DataTypes, Model} = require('sequelize');
const {
  encryptions: {encryptString, decryptString},
  sequelize
} = require("../config");

class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    passphrase: {
      type: DataTypes.TEXT,
      allowNull: false,
      get(){
        return decryptString(
          this.getDataValue("passphrase")
        );
      },
      set(plain){
        this.setDataValue(
          "passphrase",
          encryptString(plain)
        );
      }
    },

    deletedAt: {
      type: DataTypes.DATE
    }

  },
  // Config
  {
    sequelize,
    modelName: 'collection'
  }
);

// Join with Lists
const List = require("./list.model");
Collection.hasMany(List, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
List.belongsTo(Collection);

module.exports = Collection;