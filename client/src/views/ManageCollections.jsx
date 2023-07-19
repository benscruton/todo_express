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
      <CollectionForm
        collections = {collections}
      />

      <h2 className = "title has-text-centered mt-4 mb-2">
        Available Collections:
      </h2>

      {availableCollections.map(availableCollection =>
        <AvailableCollectionCard
          key = {availableCollection.id}
          availableCollection = {availableCollection}
        />
      )}
    </div>
  );
};

export default ManageCollections;