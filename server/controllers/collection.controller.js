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
      });
      await list.setCollection(coll);
      rsp.json({collectionId: coll.id});
    }
    catch(error){
      rsp.status(400).json({error});
    }
  },

  // POST to /api/collections/:collectionId/access
  grantCollectionAccess: (req, rsp) => {
    const {passphrase} = req.body;
    rsp.json({
      success: true,
      encryptedPassphrase: encryptString(passphrase)
    });
  },

  // POST to /api/collections/:collectionId
  getCollection: (req, rsp) => {
    const {collectionId} = req.params;
    const passphrase = decryptString(req.body.passphrase);
    Collection.findByPk(
      collectionId,
      {
        attributes: {exclude: ["deletedAt"]},
        include: {model: List, include: Todo}
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
      .catch(e => rsp.status(400).json({error: e}));
  }
};

module.exports = collectionController;