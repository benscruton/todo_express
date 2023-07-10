import {useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const ListDisplay = ({list}) => {
  const {
    serverUrl,
    collection,
    setCollection
  } = useContext(AppContext);

  const toggleComplete = (todoId, idx) => {
    const newState = !list.todos[idx].isComplete;
    list.todos[idx].isComplete = newState;
    axios.put(
      `${serverUrl}/api/todos/${todoId}`,
      {isComplete: newState},
      {headers: {
        ["x-collection-token"]: collection.token
      }}
    );
    setCollection({...collection,
      lists: [
        list,
        ...collection.lists.filter(l => l.id !== list.id)
      ]
    });
  };

  return (
    <>
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
        </tbody>
      </table>
    </>
  );
};

export default ListDisplay;