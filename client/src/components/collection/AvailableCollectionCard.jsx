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

  const removeCollection = id => {
    dispatch({
      type: "removeAvailableCollection",
      data: {
        collectionRemovalId: availableCollection.id,
        isActiveCollection
      }
    });
  };
  
  return (
    <div className = "card">
      <div className = "card-header">
        <h3 className = "card-header-title">
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
            className = "card-footer-item"
            onClick = {() => {
              loadCollection(collection)
            }}
          >
            Use this collection
          </a>
        }

        <a
          className = "card-footer-item has-background-danger-light has-text-danger-dark"
          onClick = {() => removeCollection(collection.id)}
        >
          Leave collection
        </a>
      </footer>
      
    </div>
  );
};

export default AvailableCollectionCard;