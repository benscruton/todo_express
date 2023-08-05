import './App.css';
import "bulma/css/bulma.min.css"
import "bulma-switch"
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
  ManageCollections,
  CollectionPage,
  Landing
} from "./views";

const serverUrl = (process.env.NODE_ENV === "production" ? "" : "http://localhost:8000");

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

  const loadCollection = async ({id, token}) => {
    const rsp = await axios.get(
      `${serverUrl}/api/collections/${id}`,
      {headers: {
        "x-collection-token": token
      }}
    )
      .catch(error => {
        console.error(error);
        return {data: {
          success: false,
          error
        }}
      });

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
    const {id, token} = JSON.parse(
      localStorage.getItem("todo-active-collection") || "{}"
    );
    if(id && token){
      loadCollection({id, token})
        .then(() => dispatch({
          type: "markCollectionLoaded"
        }));
    }
    else{
      dispatch({type: "markCollectionLoaded"});
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

            <Route path="/collections" element={
              <ManageCollections />
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
