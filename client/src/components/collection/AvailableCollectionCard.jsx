import {useContext} from "react";
import AppContext from "../../context/AppContext";

const AvailableCollectionCard = ({availableCollection}) => {
  const {
    loadCollection,
    state: {
      collection,
      isCollectionLoaded
    },
    dispatch
  } = useContext(AppContext);

  if(!isCollectionLoaded || !availableCollection) return (<></>);

  const isActiveCollection = (collection?.id == availableCollection.id);  

  const removeCollection = () => {
    dispatch({
      type: "removeAvailableCollection",
      data: {
        collectionRemovalId: availableCollection.id,
        isActiveCollection
      }
    });
  };
  
  return (
    <div className = {`card ${isActiveCollection ? "has-background-white" : "has-background-light"}`}>
      <div className = "card-header">
        <h3 className = "card-header-title is-centered">
          {availableCollection.name}
        </h3>
      </div>

      <div className = "card-content">
        <h4 className = "subtitle">
          Lists:  
        </h4>
        {availableCollection.lists}
      </div>

      <footer className = "card-footer">
        {isActiveCollection ?
          <div className = "card-footer-item has-background-light has-text-grey-light">
            Currently active
          </div>
          :
          <a
            className = "card-footer-item has-background-white"
            onClick = {() => {
              loadCollection(availableCollection)
            }}
          >
            Activate collection
          </a>
        }

        <a
          className = "card-footer-item has-background-danger-light has-text-danger-dark"
          onClick = {removeCollection}
        >
          Leave collection
        </a>
      </footer>
      
    </div>
  );
};

export default AvailableCollectionCard;