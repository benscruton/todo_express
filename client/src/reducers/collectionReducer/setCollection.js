const setCollection = (state, data) => {
  const {collection} = data;

  return {
    ...state,
    collection
  };
};

export default setCollection;