import addAvailableCollection from "./addAvailableCollection";
import addTodo from "./addTodo";
import deleteTodo from "./deleteTodo";
import setCollection from "./setCollection";
import updateTodo from "./updateTodo";

const methods = {
  addAvailableCollection,
  addTodo,
  deleteTodo,
  setCollection,
  updateTodo
}

const collectionReducer = (state, action) => {
  try{
    const method = methods[action.type];
    if(!method){
      throw new Error("Method not found");
    }
    return method(state, action.data);
  }
  catch(error){
    console.error(error);
    return state;
  }
};

export default collectionReducer;