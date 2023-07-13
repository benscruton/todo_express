const addAvailableCollection = (state, data) => {
  const {availableCollections} = state;
  const {collectionData} = data;

  const isNewCollection = (availableCollections.filter(c =>
    c.id == collectionData.id
  ).length === 0);
  
  const newAvailableCollections = isNewCollection ?
    [
      collectionData,
      ...availableCollections
    ]
    :
    availableCollections;

  // Only update todo-collections in localStorage if
  // this is a new collection
  if(isNewCollection){
    localStorage.setItem(
      "todo-collections",
      JSON.stringify(newAvailableCollections)
    );
  }
  // Set active collection in localStorage either way
  localStorage.setItem(
    "todo-active-collection",
    JSON.stringify(collectionData)
  );

  return {...state,
    availableCollections: newAvailableCollections
  }
};

export default addAvailableCollection;