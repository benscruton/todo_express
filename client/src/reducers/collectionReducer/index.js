import addAvailableCollection from "./addAvailableCollection";
import addList from "./addList";
import addTodo from "./addTodo";
import deleteList from "./deleteList";
import deleteTodo from "./deleteTodo";
import markCollectionLoaded from "./markCollectionLoaded";
import removeAvailableCollection from "./removeAvailableCollection";
import reorderList from "./reorderList";
import setCollection from "./setCollection";
import updateAvailableCollection from "./updateAvailableCollection";
import updateTodo from "./updateTodo";

const methods = {
  addAvailableCollection,
  addList,
  addTodo,
  deleteList,
  deleteTodo,
  markCollectionLoaded,
  removeAvailableCollection,
  reorderList,
  setCollection,
  updateAvailableCollection,
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