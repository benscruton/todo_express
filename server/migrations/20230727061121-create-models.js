'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;

    // Create Todos table
    await queryInterface.createTable(
      "todos",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        listId: {
          type: DataTypes.BIGINT
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
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
    );

    // Create Lists table
    await queryInterface.createTable(
      "lists",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        collectionId: {
          type: DataTypes.BIGINT
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        orderRank: {
          type: DataTypes.INTEGER
        }
      }
    );

    // Create Collections table
    await queryInterface.createTable(
      "collections",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        passphrase: {
          type: DataTypes.TEXT,
          allowNull: false,
        }
      }
    );

    // Create foreign key constraints
    await queryInterface.addConstraint("todos", {
      fields: ["listId"],
      type: "foreign key",
      name: "todos_listId_fk",
      references: { //Required field
        table: "lists",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("lists", {
      fields: ["collectionId"],
      type: "foreign key",
      name: "lists_collectionId_fk",
      references: { //Required field
        table: "collections",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("todos");
    await queryInterface.dropTable("lists");
    await queryInterface.dropTable("collections");
  }
};
