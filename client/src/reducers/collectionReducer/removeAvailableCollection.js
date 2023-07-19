const removeAvailableCollection = (state, data) => {
  const {
    collection,
    availableCollections
  } = state;
  const {
    collectionRemovalId,
    isActiveCollection
  } = data;

  const newAvailableCollections = availableCollections.filter(c =>
    c.id !== collectionRemovalId
  );

  if(isActiveCollection){
    localStorage.removeItem("todo-active-collection");
  }

  localStorage.setItem(
    "todo-collections",
    JSON.stringify(newAvailableCollections)
  );

  return {...state,
    availableCollections: newAvailableCollections,
    collection: isActiveCollection ?
      null : collection
  };
};

export default removeAvailableCollection;