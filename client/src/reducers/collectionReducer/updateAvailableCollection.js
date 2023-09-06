const updateAvailableCollection = (state, data) => {
  const {availableCollections} = state;
  const {collectionData} = data;

  const idx = availableCollections.map(
    c => c.id
  ).indexOf(collectionData.id);
  if(idx < 0) return state;

  const newAvailableCollections = [
    ...availableCollections.slice(0, idx),
    collectionData,
    ...availableCollections.slice(idx + 1)
  ];

  localStorage.setItem(
    "todo-collections",
    JSON.stringify(newAvailableCollections)
  );

  return {...state,
    availableCollections: newAvailableCollections
  };
};

export default updateAvailableCollection;