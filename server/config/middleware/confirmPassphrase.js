const {encryptions: {decryptString}} = require("..");
const {Collection, List, Todo} = require("../../models");

const plainTextPaths = ["/:collectionId/access"];

const confirmPassphrase = async (req, rsp, next) => {
  const {
    collectionId,
    listId,
    todoId
  } = req.params;
  
  // Passphrase will either come encrypted in the
  // headers, or in plain text in the request body
  const reqPassphrase = plainTextPaths.includes(req.route.path) ?
    req.body.passphrase
    :
    decryptString({
      encr: req.headers["x-collection-token"],
      keyName: "client"
    });
    
  let collPassphrase;
  if(collectionId){
    const coll = await Collection.findByPk(collectionId);
    collPassphrase = coll?.passphrase
  }
  else if(listId){
    const list = await List.findByPk(
      listId,
      {include: Collection}
    );
    collPassphrase = list?.collection?.passphrase;
  }
  else if(todoId){
    const todo = await Todo.findByPk(
      todoId,
      {include: {model: List, include: Collection}}
    );
    collPassphrase = todo?.list?.collection?.passphrase;
  }

  if(!collPassphrase){
    return rsp.status(404).json({
      success: false,
      error: "not found"
    });
  }
  if(collPassphrase !== reqPassphrase){
    return rsp.status(401).json({
      success: false,
      error: "forbidden"
    });
  }

  next();
};

module.exports = confirmPassphrase;