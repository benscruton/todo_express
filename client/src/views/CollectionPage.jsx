import {useContext, useState} from "react";
import AppContext from "../context/AppContext";
import {ListDisplay} from "../components";

const CollectionPage = () => {
  const {state: {collection}} = useContext(AppContext);

  

  return (
    <>
      <h1>
        Collection: {collection?.name}
      </h1>

      {collection?.lists?.length ?
        collection.lists.map((list, idx) =>
          <div key = {list.id}>
            <ListDisplay
              list = {list}
              listIdx = {idx}
            />
          </div>
        )
        : <></>
      }
    </>
  )
};

export default CollectionPage;