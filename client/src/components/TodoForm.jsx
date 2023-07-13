import {useState, useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const TodoForm = ({list, listIdx, todo, cleanupFunction}) => {
  const {
    serverUrl,
    state: {collection},
    // setCollection
    dispatch
  } = useContext(AppContext);

  const blankFields = {
    text: "",
    dueDate: ""
  };

  const [inputs, setInputs] = useState(todo || blankFields);
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
    console.log(collection);
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
        dispatch({
          type: "addTodo",
          data: {
            listIdx,
            todo: data.todo
          }
        }); 
      })
      .catch(e => console.error(e));
    if(cleanupFunction){
      cleanupFunction();
    }
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

export default TodoForm;