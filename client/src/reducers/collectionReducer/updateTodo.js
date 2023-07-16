const updateTodo = (state, data) => {
  const {collection} = state;
  const {listIdx, todoIdx, todo} = data;

  return {...state,
    collection: {
      ...collection,
      lists: [
        ...collection.lists.slice(0, listIdx),
        {
          ...collection.lists[listIdx],
          todos: [
            ...collection.lists[listIdx].todos.slice(0, todoIdx),
            {
              ...collection.lists[listIdx].todos[todoIdx],
              ...todo
            },
            ...collection.lists[listIdx].todos.slice(todoIdx + 1)
          ]
        },
        ...collection.lists.slice(listIdx + 1)
      ]
    }
  };
};

export default updateTodo;