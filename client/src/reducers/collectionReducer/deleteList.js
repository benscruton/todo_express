const deleteList = (state, data) => {
  const {
    collection,
    availableCollections
  } = state;
  const {listId} = data;

  // Find index of this collection
  const idx = availableCollections.map(
      ac => ac.id
  ).indexOf(collection.id);

  // Create updated object
  const updatedAvailableCollections = [
    ...availableCollections.slice(0, idx),
    {
      ...availableCollections[idx],
      lists: availableCollections[idx].lists.filter(
        list => list.id !== listId
      )
    },
    ...availableCollections.slice(idx + 1)
  ];

  // Update the version saved in local storage
  localStorage.setItem(
    "todo-collections",
    JSON.stringify(updatedAvailableCollections)
  );

  // Return new state object
  return {
    ...state,
    collection: {
      ...collection,
      lists: collection.lists.filter(
        list => list.id !== listId
      )
    },
    availableCollections: updatedAvailableCollections
  };
};

export default deleteList;