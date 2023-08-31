const addAvailableCollection = (state, data) => {
  const {availableCollections} = state;
  const {collectionData} = data;

  const isNewCollection = (availableCollections.filter(c =>
    c.id === collectionData.id
  ).length === 0);

  const collection = {
    id: collectionData.id,
    name: collectionData.name,
    lists: collectionData.lists.map(
      l => ({name: l.name, id: l.id})
    ),
    token: collectionData.token
  };
  
  const newAvailableCollections = isNewCollection ?
    [
      collection,
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
    JSON.stringify({
      id: collection.id,
      token: collection.token
    })
  );

  return {...state,
    availableCollections: newAvailableCollections
  }
};

export default addAvailableCollection;