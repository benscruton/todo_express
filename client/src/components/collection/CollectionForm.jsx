import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";
import AvailableCollectionCard from "./AvailableCollectionCard";

const CollectionForm = ({collections}) => {
  const {
    serverUrl,
    state: {availableCollections},
    dispatch,
    loadCollection
  } = useContext(AppContext);
  const navigate = useNavigate();

  const blankFields = {
    collection: "",
    passphrase: ""
  }

  const [inputs, setInputs] = useState(blankFields);
  const [inputErrors, setInputErrors] = useState(blankFields);
  const [showPassphrase, setShowPassphrase] = useState(false);

  const toggleShowPassphrase = e => {
    if(
      e._reactName === "onClick"
      || (e._reactName === "onKeyDown" && ["Space", "Enter"].includes(e.code))
    ){
      setShowPassphrase(!showPassphrase);
    }
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
            navigate("/collections/view");
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
      className = "card has-background-info"
    >
      <div className = "card-header has-text-centered">
        <h2 className = "card-header-title is-centered has-text-info-light">
          Join Collection
        </h2>
      </div>

      <div className = "card-content">

        <div className = "field">
          <label
            htmlFor = "collection"
            className = "label has-text-link-light"
          >
            Select Collection
          </label>
          <div className = "control">
            <select
              name = "collection"
              id = "collection"
              className = "select has-text-info-dark"
              value = {inputs.collection}
              onChange = {handleChange}
            >
              <option
                value = ""
                disabled
              >
                Select collection:
              </option>

              {collections
                .filter(c =>
                  !availableCollections
                    .map(ac => ac.id)
                    .includes(
                      c.id
                    )
                )
                .map(c =>
                  <option
                    key={c.id}
                    value={c.id}
                    className = "has-text-info-dark"
                  >
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
            className = "label has-text-link-light"
          >
            Collection Passphrase
          </label>
          <div className = "control has-icons-right">
            <input
              type = {showPassphrase ? "text" : "password"}
              name = "passphrase"
              id = "passphrase"
              className = "input has-text-info-dark"
              value = {inputs.passphrase}
              onChange = {handleChange}
            />
            <span className = "icon is-right has-text-info">
              <i
                className = {`clickable ${showPassphrase ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                onClick = {toggleShowPassphrase}
                tabIndex = {0}
                onKeyDown = {toggleShowPassphrase}
                aria-label = {showPassphrase ? "Hide text" : "Show text"}
              />
            </span>
          </div>

          <p className = "help is-danger-dark">
            {inputErrors.passphrase}
          </p>
        </div>

        <div className = "has-text-centered">
          <button
            type = "submit"
            className = "button has-background-info-light has-text-info-dark mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CollectionForm;