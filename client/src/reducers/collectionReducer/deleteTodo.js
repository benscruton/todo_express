const deleteTodo = (state, data) => {
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
          todos: collection.lists[listIdx].todos.filter(t =>
            t.id !== todo.id
          )
        },
        ...collection.lists.slice(listIdx + 1)
      ]
    }
  }
};

export default deleteTodo;