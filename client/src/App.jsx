import './App.css';
import {
  useState,
  useEffect,
  useReducer
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import AppContext from "./context/AppContext";
import {collectionReducer} from './reducers';
import {
  AddCollection,
  CollectionPage
} from "./views";

const serverUrl = (process.env.NODE_ENV === "production" ? "" : "http://localhost:3038");

function App() {
  const initialState = {
    collection: null,
    availableCollections: JSON.parse(
      localStorage.getItem("todo-collections") || "[]"
    )
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
      loadCollection({collectionId, token});
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
          <Link to="/">home</Link>
          |
          <Link to="/collections/add">add</Link>
          |
          <Link to="/collections/view">show</Link>
          |
          <span onClick={() => console.log(state)}>Log state</span>

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
