const {DataTypes, Model} = require('sequelize');
const {
  encryptions: {encryptString, decryptString},
  sequelize
} = require("../config");

class Collection extends Model {}

Collection.init(
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

    passphrase: {
      type: DataTypes.TEXT,
      allowNull: false,
      get(){
        return decryptString({
          encr: this.getDataValue("passphrase"),
          keyName: "db"
        });
      },
      set(plain){
        this.setDataValue(
          "passphrase",
          encryptString({
            plain,
            keyName: "db"
          })
        );
      }
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