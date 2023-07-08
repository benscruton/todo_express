const {encryptions: {decryptString}} = require("..");
const {Collection, List, Todo} = require("../../models");

const confirmPassphrase = async (req, rsp, next) => {
  const {
    collectionId,
    listId,
    todoId
  } = req.params;
  const {passphrase, isPlainText} = req.body;
  const reqPassphrase = isPlainText ?
    passphrase : decryptString(passphrase);
    
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