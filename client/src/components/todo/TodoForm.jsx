import {useState, useContext} from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const TodoForm = ({
  list,
  listIdx,
  todo,
  todoIdx,
  cleanupFunction
}) => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const blankFields = {
    text: "",
    dueDate: "",
    notes: ""
  };

  const [inputs, setInputs] = useState({
   text: todo?.text || "",
   dueDate: todo?.dueDate || "",
   notes: todo?.notes || "" 
  });
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

    const axiosOptions = {headers: {
      ["x-collection-token"]: collection.token
    }};
    if(todo){   // edit existing todo
      axios.put(
        `${serverUrl}/api/todos/${todo.id}`,
        inputs,
        axiosOptions
      )
        .catch(e => console.error(e));
      dispatch({
        type: "updateTodo",
        data: {
          listIdx,
          todoIdx,
          todo: {...todo, ...inputs}
        }
      });
    }
    else {      // add new todo
      axios.post(
        `${serverUrl}/api/lists/${list.id}/todos`,
        inputs,
        axiosOptions
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
    }
    if(cleanupFunction){
      cleanupFunction();
    }
  };

  const handleDelete = (e, todo) => {
    e.preventDefault();
    axios.delete(
      `${serverUrl}/api/todos/${todo.id}`,
      {headers: {
        ["x-collection-token"]: collection.token
      }}
    )
      .catch(e => console.error(e));
    dispatch({
      type: "deleteTodo",
      data: {
        listIdx,
        todo
      }
    });
  };

  return (
    <form
      onSubmit = {handleSubmit}
      className = "card mb-5 has-background-light has-text-left"
    >
      <div className = "card-header has-background-white">
        <h3 className = "card-header-title">
          {todo ? "Edit" : "Add"} todo
        </h3>
      </div>
      <div className = "card-content columns is-multiline">

        <div className = "field column is-8 my-1">
          <label
            htmlFor = "text"
            className = "label"
          >
            Todo Text
          </label>
          <div className="control">
            <input
              type = "text"
              name = "text"
              id = "text"
              className = "input"
              value = {inputs.text}
              onChange = {handleChange}
            />
          </div>
          <p className = "help is-danger-dark">
            {inputErrors.text}
          </p>
        </div>

        <div className = "field column is-4 my-1">
          <label
            htmlFor = "dueDate"
            className = "label"
          >
            Due Date
          </label>
          <div className = "control">
            <input
              type = "date"
              name = "dueDate"
              id = "dueDate"
              className = "input"
              value = {inputs.dueDate}
              onChange = {handleChange}
            />
          </div>
        </div>

        <div className = "field column is-12 my-1">
          <label
            htmlFor = "notes"
            className = "label"
          >
            Notes
          </label>
          <div className = "control">
            <textarea
              name = "notes"
              id = "notes"
              className = "textarea"
              value = {inputs.notes}
              onChange = {handleChange}
              rows = "3"
            />
          </div>
        </div>

        <div className = "column is-12 has-text-centered">
          <button
            type = "submit"
            className = "button is-black has-text-white mx-3"
          >
            <span className = "icon">
              <i
                className = "bi-check-circle-fill"
                aria-hidden
              />
            </span>
            <span>
              {todo ? "Update" : "Add"} todo
            </span>
          </button>

          {todo?.id ?
            <button
              className = "button is-danger"
              onClick = {e => handleDelete(e, todo)}
            >
              <span className = "icon">
                <i
                  className = "bi-trash3-fill"
                  aria-hidden
                />
              </span>
              <span>
                Delete todo
              </span>
            </button>
            :
            <></>
          }         
        </div>
      </div>
    </form>
  );
};

export default TodoForm;