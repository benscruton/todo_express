import {useContext} from "react";
import AppContext from "../context/AppContext";
import {ListDisplay} from "../components";

const CollectionPage = () => {
  const {collection} = useContext(AppContext);
  return (
    <>
      <h1>Collection: {collection?.name}</h1>
      {collection?.lists?.length ?
        collection.lists.map(list =>
          <ListDisplay
            key = {list.id}
            list = {list}
          />
        )
        : <></>
      }
    </>
  )
};

export default CollectionPage;