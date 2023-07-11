import {useState, useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const AddTodo = ({list, listIdx}) => {
  const {
    serverUrl,
    collection,
    setCollection
  } = useContext(AppContext);

  const blankFields = {
    text: "",
    dueDate: ""
  };

  const [inputs, setInputs] = useState(blankFields);
  const [inputErrors, setInputErrors] = useState(blankFields);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: ""
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(!inputs.text){
      return setInputErrors({
        ...inputErrors,
        text: "Please enter at least one character"
      })
    }
    axios.post(
      `${serverUrl}/api/lists/${list.id}/todos`,
      inputs,
      {headers: {
        ["x-collection-token"]: collection.token
      }}
    )
      .then(({data}) => {
        if(!data.success) return;
        setCollection({
          ...collection,
          lists: [
            ...collection.lists.slice(0, listIdx),
            {
              ...collection.lists[listIdx],
              todos: [
                ...collection.lists[listIdx].todos,
                data.todo
              ]
            }
          ]
        })
      })
      .catch(e => console.error(e));
  };

  return (
    <form
      onSubmit = {handleSubmit}
    >
      <p>
        <label htmlFor = "text">
          Todo Text
        </label>
        <input
          type = "text"
          name = "text"
          id = "text"
          value = {inputs.text}
          onChange = {handleChange}
        />
        <span>
          {inputErrors.text}
        </span>
      </p>

      <p>
        <label htmlFor = "dueDate">
          Todo Text
        </label>
        <input
          type = "date"
          name = "dueDate"
          id = "dueDate"
          value = {inputs.dueDate}
          onChange = {handleChange}
        />
      </p>
      <button type = "submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;