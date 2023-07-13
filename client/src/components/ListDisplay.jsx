import {useContext, useState} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import {TodoForm} from ".";

const ListDisplay = ({list, listIdx}) => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const toggleComplete = (todoId, todoIdx) => {
    const newCompletionStatus = !list.todos[todoIdx].isComplete;
    axios.put(
      `${serverUrl}/api/todos/${todoId}`,
      {isComplete: newCompletionStatus},
      {headers: {
        ["x-collection-token"]: collection.token
      }}
    )
      .catch(e => console.error(e));
    dispatch({
      type: "updateTodo",
      data: {
        listIdx,
        todoIdx,
        todo: {isComplete: newCompletionStatus}
      }
    });
  };

  return (
    <div className = "box">
      <h2>{list.name}</h2>
      <table>
        <tbody>
          {list.todos.map((todo, idx) =>
            <tr key = {todo.id}>
              <td
                style = {{textDecoration: todo.isComplete ? "line-through" : "none"}}
                value = {todo.id}
                onClick = {() => toggleComplete(todo.id, idx)}
              >
                {todo.text}
              </td>
              <td>{todo.dueDate || ""}</td>
              <td>{todo.notes || ""}</td>
            </tr>
          )}
          <tr>
            <td>
              {showForm ?
                <TodoForm
                  list = {list}
                  listIdx = {listIdx}
                  cleanupFunction = {() => setShowForm(false)}
                />
                :
                <button
                  onClick = {() => setShowForm(true)}
                >
                  +
                </button>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListDisplay;