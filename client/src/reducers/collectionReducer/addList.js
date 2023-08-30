const addList = (state, data) => {
  const {collection} = state;
  const {list} = data;

  // Add new list name to availableCollection data in state

  // Add list to activeCollection and availableCollections data in localStorage

  return {
    ...state,
    collection: {
      ...collection,
      lists: [
        ...collection.lists,
        list
      ]
    }
  };
};

export default addList;