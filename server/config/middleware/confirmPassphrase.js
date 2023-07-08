const {encryptions: {decryptString}} = require("..");
const {Collection} = require("../../models");

const confirmPassphrase = (req, rsp, next) => {
  const {collectionId} = req.params;
  const {passphrase, isPlainText} = req.body;
  const plainPassphrase = isPlainText ?
    passphrase : decryptString(passphrase);
    
  Collection.findByPk(collectionId)
    .then(coll => {
      if(!coll){
        return rsp.status(404).json({
          success: false,
          error: "not found"
        });
      }

      if(plainPassphrase !== coll.passphrase){
        return rsp.status(401).json({
          success: false,
          error: "forbidden"
        });
      }
      
      next();
    })
    .catch(error => rsp.status(400).json({
      success: false,
      error
    }));
};

module.exports = confirmPassphrase;