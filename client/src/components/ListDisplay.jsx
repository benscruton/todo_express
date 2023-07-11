import {useContext} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const ListDisplay = ({list, listIdx}) => {
  const {
    serverUrl,
    collection,
    setCollection
  } = useContext(AppContext);

  const toggleComplete = (todoId, idx) => {
    const newCompletionStatus = !list.todos[idx].isComplete;
    axios.put(
      `${serverUrl}/api/todos/${todoId}`,
      {isComplete: newCompletionStatus},
      {headers: {
        ["x-collection-token"]: collection.token
      }}
    )
      .catch(e => console.error(e));
    setCollection({...collection,
      lists: [
        ...collection.lists.slice(0, listIdx),
        {...collection.lists[listIdx],
          todos: [
            ...collection.lists[listIdx].todos.slice(0, idx),
            {
              ...collection.lists[listIdx].todos[idx],
              isComplete: newCompletionStatus
            },
            ...collection.lists[listIdx].todos.slice(idx + 1)
          ]
        },
        ...collection.lists.slice(listIdx + 1)
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