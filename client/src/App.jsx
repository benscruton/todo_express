import './App.css';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import AppContext from "./context/AppContext";
import {
  AddCollection,
  CollectionPage
} from "./views";

const serverUrl = (process.env.NODE_ENV === "production" ? "" : "http://localhost:3038");

function App() {
  const [availableCollections, setAvailableCollections] = useState(
    JSON.parse(localStorage.getItem("todo-collections") || "[]")
  );
  const [collection, setCollection] = useState(null);

  const loadCollection = ({collectionId, token}) => {
    return axios.get(
      `${serverUrl}/api/collections/${collectionId}`,
      {headers: {
        "x-collection-token": token
      }}
    )
      .then(({data}) => {
        if(data.success){
          setCollection({
            ...data.collection,
            token
          });
          return data.collection;
        }
      })
  };

  useEffect(() => {
    const {id: collectionId, token} = JSON.parse(
      localStorage.getItem("todo-active-collection") || "{}"
    );
    if(collectionId && token){
      loadCollection({collectionId, token});
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{
        serverUrl,
        availableCollections,
        setAvailableCollections,
        collection,
        setCollection,
        loadCollection
      }}>
        <Router>
          <Link to="/">home</Link>
          |
          <Link to="/collections/add">add</Link>
          |
          <Link to="/collections/view">show</Link>
          |
          <span onClick={() => console.log(collection)}>Log collection</span>

          <Routes>
            <Route path="/" element={
              <p>
                home
              </p>
            }/>

            <Route path="/collections/add" element={
              <AddCollection />
            }/>

            <Route path="/collections/view" element={
              <CollectionPage />
            }/>
          </Routes>
          
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
