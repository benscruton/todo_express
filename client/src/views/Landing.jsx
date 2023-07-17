import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../context/AppContext";

const Landing = () => {
  const navigate = useNavigate();
  const {state: {
    collection,
    isCollectionLoaded
  }} = useContext(AppContext);

  useEffect(() => {
    if(isCollectionLoaded){
      navigate(collection ?
        "collections/view"
        :
        "collections/add"
      );
    }
  }, [isCollectionLoaded]);

  return (<></>);
};

export default Landing;