import {useState, useEffect, useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import {
  CollectionForm,
  AvailableCollectionCard
} from "../components";

const ManageCollections = () => {
  const {
    serverUrl,
    state: {availableCollections}
  } = useContext(AppContext);

  const [collections, setCollections] = useState([]);
  useEffect(() => {
    axios.get(`${serverUrl}/api/collections`)
      .then(({data}) => setCollections(data.collections))
      .catch(e => console.error(e));
  }, []);

  
  return (
    <div className = "container">
      <div className = "columns is-multiline is-centered">
        <div className = "column is-4-tablet is-3-widescreen">
          <CollectionForm
            collections = {collections}
          />
        </div>

        {availableCollections.map(availableCollection =>
          <div
            key = {availableCollection.id}
            className = "column is-4-tablet is-3-widescreen"
          >
            <AvailableCollectionCard
              availableCollection = {availableCollection}
            />
          </div>
        )}



        {/* {availableCollections.map(availableCollection =>
          <div
            key = {availableCollection.id}
            className = "column is-4-tablet is-3-widescreen"
          >
            <AvailableCollectionCard
              availableCollection = {availableCollection}
            />
          </div>
        )}
        {availableCollections.map(availableCollection =>
          <div
            key = {availableCollection.id}
            className = "column is-4-tablet is-3-widescreen"
          >
            <AvailableCollectionCard
              availableCollection = {availableCollection}
            />
          </div>
        )}
        {availableCollections.map(availableCollection =>
          <div
            key = {availableCollection.id}
            className = "column is-4-tablet is-3-widescreen"
          >
            <AvailableCollectionCard
              availableCollection = {availableCollection}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ManageCollections;