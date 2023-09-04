const reorderList = (state, data) => {
  const {collection} = state;
  const {
    strategy,
    listIdx,
    todoIdx,
    showComplete
  } = data;

  const todoId = collection.lists[listIdx].todos[todoIdx].id;

  switch(strategy){
    case "top":
      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                collection.lists[listIdx].todos[todoIdx],
                ...collection.lists[listIdx].todos.filter(
                  t => t.id !== todoId
                )
              ]
            },
            ...collection.lists.slice(listIdx + 1)
          ]
        }
      };

    case "up":
      let prevItemIdx = todoIdx - 1;
      if(!showComplete){
        while(prevItemIdx >= 0){
          const item = collection.lists[listIdx].todos[prevItemIdx];
          if(item && !item.isComplete){
            break;
          }
          prevItemIdx--;
        }
      }
      if(prevItemIdx < 0) return state;
      
      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos.slice(0, prevItemIdx),
                collection.lists[listIdx].todos[todoIdx],
                ...collection.lists[listIdx].todos.slice(prevItemIdx + 1, todoIdx),
                collection.lists[listIdx].todos[prevItemIdx],
                ...collection.lists[listIdx].todos.slice(todoIdx + 1)
              ]
            },
            ...collection.lists.slice(listIdx + 1)
          ]
        }
      };
    
    case "down":
      let nextItemIdx = todoIdx + 1;
      if(!showComplete){
        while(nextItemIdx < collection.lists[listIdx].length){
          const item = collection.lists[listIdx].todos[nextItemIdx];
          if(item && !item.isComplete){
            break;
          }
          nextItemIdx++;
        }
      }
      if(nextItemIdx >= collection.lists[listIdx].length) return state;

      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos.slice(0, todoIdx),
                collection.lists[listIdx].todos[nextItemIdx],
                ...collection.lists[listIdx].todos.slice(todoIdx + 1, nextItemIdx),
                collection.lists[listIdx].todos[todoIdx],
                ...collection.lists[listIdx].todos.slice(nextItemIdx + 1)
              ]
            },
            ...collection.lists.slice(listIdx + 1)
          ]
        }
      };

    case "bottom":
      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos.filter(
                  t => t.id !== todoId
                ),
                collection.lists[listIdx].todos[todoIdx]
              ]
            },
            ...collection.lists.slice(listIdx + 1)
          ]
        }
      };
    
    default:
      console.error("Strategy not found.");
      return state;
  }
};

export default reorderList;