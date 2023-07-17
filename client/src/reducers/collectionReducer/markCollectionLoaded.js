const markCollectionLoaded = (state) => {
  return {...state,
    isCollectionLoaded: true
  };
};

export default markCollectionLoaded;