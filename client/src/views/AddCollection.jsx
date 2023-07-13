import {useState, useEffect, useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const AddCollection = () => {
  const {
    serverUrl,
    state: {availableCollections},
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
            // Create scaled-down object for local storage
            // const shortCollection = {
            //   id: inputs.collection,
            //   name: coll.name,
            //   token: accessData.encryptedPassphrase
            // };
            // Append to availableCollections state variable and
            // add to localStorage, if not there already
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
            // if(availableCollections.filter(c =>
            //     c.id == inputs.collection
            //   ).length === 0
            // ){
            //   const newAvailableCollections = [
            //     ...availableCollections,
            //     collectionData
            //   ];
            //   setAvailableCollections(newAvailableCollections);
            //   localStorage.setItem(
            //     "todo-collections",
            //     JSON.stringify(newAvailableCollections)
            //   );
            // }
            // // Set active collection in localStorage
            // localStorage.setItem(
            //   "todo-active-collection",
            //   JSON.stringify(collectionData)
            // );
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
    <>
      <form
        onSubmit = {handleSubmit}
      >
        <p>
          <label htmlFor = "collection">
            Select Collection
          </label>
          <select
            name = "collection"
            id = "collection"
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
          <span>
            {inputErrors.collection}
          </span>
        </p>

        <p>
          <label htmlFor = "passphrase">
            Collection Passphrase
          </label>
          <input
            type = "text"
            name = "passphrase"
            id = "passphrase"
            value = {inputs.passphrase}
            onChange = {handleChange}
          />
          <span>
            {inputErrors.passphrase}
          </span>
        </p>

        <button
          type = "submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddCollection;