const addList = (state, data) => {
  const {
    collection,
    availableCollections
  } = state;
  const {list} = data;

  // Find index of this collection
  const idx = availableCollections.map(
    ac => ac.id
  ).indexOf(collection.id);

  // Create updated object
  const updatedAvailableCollections = [
    ...availableCollections.slice(0, idx),
    {
      ...availableCollections[idx],
      lists: [
        ...availableCollections[idx].lists,
        {name: list.name, id: list.id}
      ]
    },
    ...availableCollections.slice(idx + 1)
  ];

  // Add list to availableCollections data in localStorage
  localStorage.setItem(
    "todo-collections",
    JSON.stringify(updatedAvailableCollections)
  );

  // Return new state object
  return {
    ...state,
    collection: {
      ...collection,
      lists: [
        ...collection.lists,
        list
      ]
    },
    availableCollections: updatedAvailableCollections
  };
};

export default addList;