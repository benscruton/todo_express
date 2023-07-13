import {useState, useEffect, useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const AddCollection = () => {
  const {
    serverUrl,
    dispatch,
    loadCollection
  } = useContext(AppContext);

  const [collections, setCollections] = useState([]);
  useEffect(() => {
    axios.get(`${serverUrl}/api/collections`)
      .then(({data}) => setCollections(data.collections))
      .catch(e => console.error(e));
  }, []);

  const blankFields = {
    collection: "",
    passphrase: ""
  }

  const [inputs, setInputs] = useState(blankFields);
  const [inputErrors, setInputErrors] = useState(blankFields);

  const handleChange = e => {
    setInputs({...inputs,
      [e.target.name]: e.target.value
    });
    setInputErrors({...inputErrors,
      [e.target.name]: ""
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    // Validate data, and show error messages if any
    let hasErrors = false;
    const errors = blankFields;
    if(!inputs.collection){
      hasErrors = true;
      errors.collection = "Please select a collection.";
    }
    if(!inputs.passphrase){
      hasErrors = true;
      errors.passphrase = "Please enter a passphrase.";
    }
    if(hasErrors){
      return setInputErrors(errors);
    }

    // Get encrypted passphrase
    axios.post(
      `${serverUrl}/api/collections/${inputs.collection}/access`,
      {passphrase: inputs.passphrase}
    )
      .then(({data: accessData}) => {
        // Set collection state variable
        loadCollection({
          collectionId: inputs.collection,
          token: accessData.encryptedPassphrase
        })
          .then(coll => {
            if(!coll) return;
            dispatch({
              type: "addAvailableCollection",
              data: {
                collectionData: {
                  id: inputs.collection,
                  name: coll.name,
                  token: accessData.encryptedPassphrase
                }
              }
            });
          })
          .catch(e => console.error(e));

        setInputs(blankFields);
      })
      .catch(e => {
        // If it's an auth issue, display error message
        if(e?.response?.status == 401){
          return setInputErrors({...inputErrors,
            passphrase: "Invalid passphrase."
          });
        }
        // Otherwise, log error I guess
        console.error(e);
      });
  };

  return (
    <div className = "container">
      <form
        onSubmit = {handleSubmit}
        className = "box"
      >
        <div className = "field">
          <label
            htmlFor = "collection"
            className = "label"
          >
            Select Collection
          </label>
          <div className = "control">
            <select
              name = "collection"
              id = "collection"
              className = "select"
              value = {inputs.collection}
              onChange = {handleChange}
            >
              <option
                value = ""
                disabled
              >
                Select collection:
              </option>

              {collections.map(c =>
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              )}
            </select>
          </div>
          <p className = "help is-danger">
            {inputErrors.collection}
          </p>
        </div>

        <div className = "field">
          <label
            htmlFor = "passphrase"
            className = "label"
          >
            Collection Passphrase
          </label>
          <div className = "control">
            <input
              type = "text"
              name = "passphrase"
              id = "passphrase"
              className = "input"
              value = {inputs.passphrase}
              onChange = {handleChange}
            />
          </div>
          <p className = "help is-danger">
            {inputErrors.passphrase}
          </p>
        </div>

        <button
          type = "submit"
          className = "button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollection;