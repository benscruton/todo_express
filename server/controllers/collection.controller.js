const {
  encryptions: {encryptString, decryptString}
} = require("../config");
const {Collection, List, Todo} = require("../models");

const collectionController = {

  // POST to /api/collections
  create: async (req, rsp) => {
    try{
      const coll = await Collection.create(
        req.body,
        {fields: ["name", "passphrase"]}
      );
      const list = await List.create({
        name: "To Do",
        orderRank: 0
      });
      await list.setCollection(coll);
      rsp.json({collectionId: coll.id});
    }
    catch(error){
      rsp.status(500).json({error});
    }
  },

  // POST to /api/collections/:collectionId/access
  encryptPassphrase: (req, rsp) => {
    try{
      const {passphrase} = req.body;
      rsp.json({
        success: true,
        encryptedPassphrase: encryptString({
          plain: passphrase,
          keyName: "client"
        })
      });
    }
    catch(error){
      rsp.status(500).json({
        success: false,
        error
      });
    }
  },

  // GET to /api/collections/:collectionId
  getCollection: (req, rsp) => {
    const {collectionId} = req.params;

    Collection.findByPk(
      collectionId,
      {
        attributes: {exclude: ["passphrase"]},
        include: {
          model: List,
          include: {
            model: Todo,
          },
        },
        order: [
          [List, "orderRank", "ASC"],
          [List, Todo, "orderRank", "ASC"]
        ]
      }
    ).then(coll => {
      if(!coll){
        return rsp.status(404).json({success: false});
      }
      rsp.json({
        success: true,
        collection: coll
      });
    }).catch(error => rsp.status(500).json({error}));
  },

  // POST to /api/collections/:collectionId/lists
  addList: async (req, rsp) => {
    try{
      const {collectionId} = req.params;
      const listData = req.body;

      const collection = await Collection.findByPk(
        collectionId,
        {include: List}
      );
      listData.orderRank = collection.lists.length ?
        Math.max(
          ...collection.lists.map(l => l.orderRank)
        ) + 1
        :
        0;

      const listSimple = await List.create(
        listData,
        {fields: ["name", "orderRank"]}
      );
      const list = await List.findByPk(
        listSimple.id,
        {include: {model: Todo}}
      );

      await list.setCollection(collection);
      rsp.json({
        success: true,
        list
      });
    }
    catch(error){
      rsp.status(500).json({
        success: false,
        error
      });
    }
  },

  getAllCollectionNames: (req, rsp) => {
    Collection.findAll(
      {
        attributes: ["name", "id"],
        order: [["name", "ASC"]]
      }
    )
      .then(collections => rsp.json({collections}))
      .catch(error => rsp.status(500).json({error})); 
  },
};

module.exports = collectionController;