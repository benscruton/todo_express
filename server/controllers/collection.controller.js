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

  // POST to /api/collections/:collectionId
  getCollection: (req, rsp) => {
    const {collectionId} = req.params;
    const passphrase = decryptString({
      encr: req.body.passphrase,
      keyName: "client"
    });
    Collection.findByPk(
      collectionId,
      {
        attributes: {exclude: ["deletedAt"]},
        include: {
          model: List, include: {
            model: Todo,
            order: [
              [Todo, "orderRank", "ASC"]
            ]
          }
        }
      }
    )
      .then(coll => {
        if(!coll){
          return rsp.status(404).json({success: false});
        }
        if(passphrase !== coll.passphrase){
          return rsp.status(401).json({success: false});
        }
        coll.passphrase = "";
        rsp.json({
          success: true,
          collection: coll
        });
      })
      .catch(error => rsp.status(500).json({error}));
  },
};

module.exports = collectionController;