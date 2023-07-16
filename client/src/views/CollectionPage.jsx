import {useContext} from "react";
import AppContext from "../context/AppContext";
import {ListDisplay} from "../components";

const CollectionPage = () => {
  const {state: {collection}} = useContext(AppContext);

  return (
    <div className = "container">
      <h1
        className = "has-text-centered title"
      >
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