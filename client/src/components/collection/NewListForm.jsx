import {useState, useContext} from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const NewListForm = () => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const blankInputs = {
    name: ""
  };
  const [inputs, setInputs] = useState(blankInputs);
  const [inputErrors, setInputErrors] = useState(blankInputs);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(!inputs.name){
      return setInputErrors({
        name: "Please enter at least one character."
      });
    }

    const axiosOptions = {headers: {
      "x-collection-token": collection.token
    }};
    axios.post(
      `${serverUrl}/api/collections/${collection.id}/lists`,
      inputs,
      axiosOptions
    )
      .then(({data}) => {
        dispatch({
          type: "addList",
          data
        });
        setInputs(blankInputs);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className = "container has-text-centered columns is-centered px-4">
      <form
        className = "box mx-2 column is-half-desktop"
        onSubmit = {handleSubmit}
      >
        <div className = "field">
          <label
            htmlFor = "name"
            className = "label"
          >
            List Name
          </label>
          <div className = "control">
            <input
              type = "text"
              name = "name"
              id = "name"
              className = "input has-text-centered"
              value = {inputs.name}
              onChange = {handleChange}
            />
          </div>
          <p className = "help has-text-danger-dark">
            {inputErrors.name}
          </p>
        </div>

        <div className = "has-text-centered">
          <button
            type = "submit"
            className = "button has-background-black has-text-white mt-4"
          >
            Add List
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewListForm;