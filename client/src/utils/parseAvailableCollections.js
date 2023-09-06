const parseAvailableCollections = () => {
  const availableCollections = JSON.parse(
    localStorage.getItem("todo-collections") || "[]"
  );

  const oldFormatCollections = [];

  availableCollections.forEach(coll => {
    for(const list of coll.lists){
      if(typeof list === "string" || !list?.id){
        oldFormatCollections.push({
          id: coll.id,
          token: coll.token
        });
        break;
      }
    }
  });

  return {
    availableCollections,
    oldFormatCollections
  };
    
};

export default parseAvailableCollections;