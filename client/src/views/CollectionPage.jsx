import {useContext, useState} from "react";
import AppContext from "../context/AppContext";
import {ListDisplay} from "../components";

const CollectionPage = () => {
  const {state: {collection}} = useContext(AppContext);

  

  return (
    <div className = "container">
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
    </div>
  )
};

export default CollectionPage;