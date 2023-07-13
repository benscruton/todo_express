import {useContext} from "react";
import AppContext from "../context/AppContext";
import {AddTodo, ListDisplay} from "../components";

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
            <AddTodo
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