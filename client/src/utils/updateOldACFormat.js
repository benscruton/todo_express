import axios from "axios";

const updateOldACFormat = async ({
  collection,
  dispatch,
  serverUrl
}) => {
  try{
    // Fetch collection data
    const rsp = await axios.get(
      `${serverUrl}/api/collections/${collection.id}`,
      {headers: {
        "x-collection-token": collection.token
      }}
    );
    const collectionData = {
      id: collection.id,
      name: rsp.data.collection.name,
      lists: rsp.data.collection.lists.map(list => ({
        id: list.id,
        name: list.name
      })),
      token: collection.token
    };

    // Update state object and localStorage
    dispatch({
      type: "updateAvailableCollection",
      data: {collectionData}
    });
  }
  catch(e){
    console.log(e);
  }
};

export default updateOldACFormat;