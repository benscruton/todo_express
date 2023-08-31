import {useContext} from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const DeleteListButton = ({
  listId,
  activeListIdx,
  setActiveListIdx
}) => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const deleteList = () => {
    axios.delete(
      `${serverUrl}/api/lists/${listId}`,
      {headers: {
        "x-collection-token": collection.token
      }}
    )
      .catch(e => console.log(e));
    dispatch({
      type: "deleteList",
      data: {listId}
    });
  };

  return (
    <div className = "has-text-centered">
      <button
        className = "button is-danger"
        onClick = {deleteList}
      >
        <span className = "icon">
          <i
            className = "bi-trash3-fill"
            aria-hidden
          />
        </span>
        <span>
          Delete List
        </span>
      </button>
    </div>
  )
};

export default DeleteListButton;