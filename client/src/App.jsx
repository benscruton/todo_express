import './App.css';
import {
  useEffect,
  useReducer
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";
import AppContext from "./context/AppContext";
import {collectionReducer} from './reducers';
import {NavBar} from './components';
import {
  AddCollection,
  CollectionPage,
  Landing
} from "./views";

const serverUrl = (process.env.NODE_ENV === "production" ? "" : "http://192.168.0.163:3038");

function App() {
  const initialState = {
    collection: null,
    availableCollections: JSON.parse(
      localStorage.getItem("todo-collections") || "[]"
    ),
    isCollectionLoaded: false
  };

  const [state, dispatch] = useReducer(
    collectionReducer,
    initialState
  );

  const loadCollection = async ({collectionId, token}) => {
    const rsp = await axios.get(
      `${serverUrl}/api/collections/${collectionId}`,
      {headers: {
        "x-collection-token": token
      }}
    );
    const {success, collection} = rsp.data;
    if(success){
      collection.token = token;
      dispatch({
        type: "setCollection",
        data: {collection}
      });
      return collection;
    }
  };

  useEffect(() => {
    const {id: collectionId, token} = JSON.parse(
      localStorage.getItem("todo-active-collection") || "{}"
    );
    if(collectionId && token){
      loadCollection({collectionId, token})
        .then(() => dispatch({
          type: "markCollectionLoaded"
        }));
    }
    
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{
        serverUrl,
        state,
        dispatch,
        loadCollection
      }}>
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={
              <Landing />
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
