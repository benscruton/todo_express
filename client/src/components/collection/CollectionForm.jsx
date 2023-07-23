import {useState, useContext} from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const CollectionForm = ({collections}) => {
  const {
    serverUrl,
    dispatch,
    loadCollection
  } = useContext(AppContext);

  const blankFields = {
    collection: "",
    passphrase: ""
  }

  const [inputs, setInputs] = useState(blankFields);
  const [inputErrors, setInputErrors] = useState(blankFields);
  const [showPassphrase, setShowPassphrase] = useState(false);

  const toggleShowPassphrase = e => {
    e.preventDefault();
    setShowPassphrase(!showPassphrase);
  };

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
          id: inputs.collection,
          token: accessData.encryptedPassphrase
        })
          .then(coll => {
            if(!coll) return;
            dispatch({
              type: "addAvailableCollection",
              data: {
                collectionData: {
                  ...coll,
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
    <form
        onSubmit = {handleSubmit}
        className = "box has-background-light"
      >
        <h2 className = "title has-text-centered">
          Join Collection
        </h2>

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
          <p className = "help is-danger-dark">
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
          <div className = "control has-icons-right">
            <input
              type = {showPassphrase ? "text" : "password"}
              name = "passphrase"
              id = "passphrase"
              className = "input"
              value = {inputs.passphrase}
              onChange = {handleChange}
            />
            <span className = "icon is-right has-text-grey">
              <i
                className = {`clickable ${showPassphrase ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                onClick = {toggleShowPassphrase}
              />
            </span>
          </div>

          <p className = "help is-danger-dark">
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
  );
};

export default CollectionForm;