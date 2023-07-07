const {
  authentications: {apiKeyValid},
  encryptions: {encryptString, decryptString}
} = require("../config");
const {Collection} = require("../models");

const collectionController = {
  create: (req, rsp) => {
    if(!apiKeyValid(req.headers["x-api-key"])){
      return rsp.status(401).json({error: "forbidden"});
    }
    Collection.create(
      req.body,
      {fields: ["name", "passphrase"]}
    )
      .then(coll => rsp.json(coll))
      .catch(e => rsp.status(400).json({error: e}));
  },

  grantCollectionAccess: (req, rsp) => {
    const {collectionId} = req.params;
    const {passphrase} = req.body;

    Collection.findByPk(collectionId)
      .then(coll => {
        if(passphrase !== coll.passphrase){
          return rsp.status(401).json({success: false});
        }
        rsp.json({
          success: true,
          encryptedPassphrase: encryptString(passphrase)
        });
      })
      .catch(e => rsp.status(400).json({error: e}));
  },

  getCollection: (req, rsp) => {
    const {collectionId} = req.params;
    const passphrase = decryptString(req.body.passphrase);
    Collection.findByPk(
      collectionId,
      {attributes: {exclude: ["deletedAt"]}}
    )
      .then(coll => {
        if(passphrase !== coll.passphrase){
          return rsp.status(401).json({success: false});
        }
        rsp.json({
          success: true,
          collection: coll
        });
      })
      .catch(e => rsp.status(400).json({error: e}));
  }
};

module.exports = collectionController;