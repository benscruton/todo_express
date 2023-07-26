const reorderList = (state, data) => {
  const {collection} = state;
  const {
    strategy,
    listIdx,
    todoIdx
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
      if(todoIdx === 0){
        return state;
      }
      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos.slice(0, todoIdx - 1),
                collection.lists[listIdx].todos[todoIdx],
                collection.lists[listIdx].todos[todoIdx - 1],
                ...collection.lists[listIdx].todos.slice(todoIdx + 1)
              ]
            },
            ...collection.lists.slice(listIdx + 1)
          ]
        }
      };
    
    case "down":
      if(todoIdx === collection.lists[listIdx].todos.length - 1){
        return state;
      }
      return {...state,
        collection: {
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos.slice(0, todoIdx),
                collection.lists[listIdx].todos[todoIdx + 1],
                collection.lists[listIdx].todos[todoIdx],
                ...collection.lists[listIdx].todos.slice(todoIdx + 2)
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