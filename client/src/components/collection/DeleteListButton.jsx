import {useState, useContext} from "react";
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

  const [confirmDelete, setConfirmDelete] = useState(false);

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

    if(activeListIdx >= collection?.lists?.length - 1){
      setActiveListIdx(activeListIdx - 1);
    }

    setConfirmDelete(false)
  };

  return (
    <div className = "has-text-centered">
      <button
        className = "button is-danger"
        onClick = {() => setConfirmDelete(true)}
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

      {confirmDelete ?
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick = {() => setConfirmDelete(false)}
          />
          <div className="modal-content">
            <div className = "card has-text-centered">
              <div className = "card-header">
                <h3 className = "card-header-title is-centered">
                  Are you sure you want to delete this list?
                </h3>
              </div>
              <div className = "card-content">
                <p>
                  All items on the list will also be deleted.
                </p>
                <p>
                  This action cannot be undone.
                </p>

                <button
                  className = "button is-info mx-2 mt-3"
                  onClick = {() => setConfirmDelete(false)}
                >
                  <span className = "icon">
                    <i
                      className = "bi-x-square-fill"
                      aria-hidden
                    />
                  </span>
                  <span>
                    No, go back
                  </span>
                </button>

                <button
                  className = "button is-danger mx-2 mt-3"
                  onClick = {deleteList}
                >
                  <span className = "icon">
                    <i
                      className = "bi-trash3-fill"
                      aria-hidden
                    />
                  </span>
                  <span>
                    Yes, delete
                  </span>
                </button>
              
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick = {() => setConfirmDelete(false)}
          />
        </div>
        :
        <></>
      }
    </div>
  )
};

export default DeleteListButton;