
import {useContext, useState} from "react";
import AppContext from "../context/AppContext";
import {
  ListDisplay,
  NewListForm
} from "../components";

const CollectionPage = () => {
  const {state: {collection}} = useContext(AppContext);
  
  const [showComplete, setShowComplete] = useState(true);
  const [activeListIdx, setActiveListIdx] = useState(0);
  const toggleShowComplete = () => setShowComplete(!showComplete);

  let x = [];
  while(x.length < 100){
    x.push("hello");
  }

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
        <div className = "tabs is-centered is-boxed">
          <ul>
            {collection.lists.map((list, idx) =>
              <li
                key = {list.id}
                className = {activeListIdx === idx ? "is-active" : ""}
              >
                <a onClick = {() => setActiveListIdx(idx)}>
                  {list.name}
                </a>
              </li>
            )}
            <li className = {activeListIdx === -1 ? "is-active" : ""}>
              <a onClick = {() => setActiveListIdx(-1)}>
                <span className = "icon">
                  <i
                    className = "bi-clipboard2-plus "
                    aria-hidden
                  />
                </span>
                <span>
                  Add List
                </span>
              </a>
            </li>
          </ul>
        </div>
        : <></>
      }

      {activeListIdx === -1 ?
        <NewListForm />
        :
        collection?.lists && collection.lists[activeListIdx] ?
          <ListDisplay
            list = {collection.lists[activeListIdx]}
            listIdx = {activeListIdx}
            showComplete = {showComplete}
          />
          :
          <></>
      }
    </div>
  )
};

export default CollectionPage;