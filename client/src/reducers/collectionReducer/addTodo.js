const addTodo = (state, data) => {
  const {collection} = state;
  const {listIdx, todo} = data;

  return {
    ...state,
    collection: {
      ...collection,
      lists: [
        ...collection.lists.slice(0, listIdx),
        {
          ...collection.lists[listIdx],
          todos: [
            ...collection.lists[listIdx].todos,
            todo
          ]
        }
      ]
    }
  };
};

export default addTodo;