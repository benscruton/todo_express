import {useContext, useState} from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import TodoForm from "./TodoForm";

const ListDisplay = ({list, listIdx}) => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const [expandedItems, setExpandedItems] = useState([]);

  const expandItem = id => {
    setExpandedItems([
      ...expandedItems,
      id
    ])
  };

  const contractItem = id => setExpandedItems(
    expandedItems.filter(item => item !== id)
  );

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
      <h2 className = "subtitle is-size-3 has-text-centered">
        {list.name}
      </h2>

      <ul>
        {[
          ...list.todos,
          null
        ].map((todo, todoIdx) => {
          const id = todo?.id || "new";
          const isExpanded = expandedItems.includes(id);
          return (
            <li
              key = {id}
              className = {`my-2 ${id === "new" ? "has-text-centered" : ""}`}
            >
              <button
                className = "button is-small mr-3"
                onClick = {() => 
                  isExpanded ?
                    contractItem(id) : expandItem(id)
                }
              >
                {isExpanded ?
                  "x"
                  :
                  (id === "new" ? "+" : "v")
                }
              </button>
              {todo?.id ?
                <span
                  style = {{textDecoration: todo.isComplete ? "line-through" : "none"}}
                  value = {todo.id}
                  onClick = {() => toggleComplete(todo.id, todoIdx)}
                >
                  {todo.text}
                </span>
                :
                <></>
              }
              
              {isExpanded ?
                <TodoForm
                  list = {list}
                  listIdx = {listIdx}
                  todo = {todo}
                  todoIdx = {todoIdx}
                  cleanupFunction = {() => {
                    contractItem(id)
                  }}
                />
                :
                <></>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListDisplay;