
import {useContext, useState} from "react";
import AppContext from "../context/AppContext";
import {ListDisplay} from "../components";

const CollectionPage = () => {
  const {state: {collection}} = useContext(AppContext);
  
  const [showComplete, setShowComplete] = useState(true);
  const toggleShowComplete = () => setShowComplete(!showComplete);

  return (
    <div className = "container">
      <h1
        className = "has-text-centered title"
      >
        Collection: {collection?.name}
      </h1>

      <div className = "is-flex is-justify-content-flex-end">
        <div className = "field">
          <input
            type = "checkbox"
            id = "showCompleteSwitch"
            className = "switch is-rtl is-info"
            checked = {showComplete}
            onChange = {toggleShowComplete}
          />
          <label htmlFor = "showCompleteSwitch">
            Show completed items
          </label>
        </div>
      </div>

      {collection?.lists?.length ?
        collection.lists.map((list, idx) =>
          <div key = {list.id}>
            <ListDisplay
              list = {list}
              listIdx = {idx}
              showComplete = {showComplete}
            />
          </div>
        )
        : <></>
      }
    </div>
  )
};

export default CollectionPage;