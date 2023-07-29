import { useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import TodoForm from "./TodoForm";

const TodoListItem = ({
  todo,
  todoIdx,
  list,
  listIdx,
  expandedItems,
  expandItem,
  contractItem
}) => {
  const {
    serverUrl,
    state: {collection},
    dispatch
  } = useContext(AppContext);

  const id = todo?.id || "new";
  const canMoveUp = (todoIdx !== 0);
  const canMoveDown = (todoIdx !== list.todos.length - 1);
  const isExpanded = expandedItems.includes(id);

  const toggleComplete = (todoId, todoIdx) => {
    const newCompletionStatus = !list.todos[todoIdx].isComplete;
    axios.put(
      `${serverUrl}/api/todos/${todoId}`,
      {isComplete: newCompletionStatus},
      {headers: {
        "x-collection-token": collection.token
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

  const moveItem = strategy => {
    if(
      (["up", "top"].includes(strategy) && !canMoveUp)
      || (["down", "bottom"].includes(strategy) && !canMoveDown)
    ){
      return;
    }
    dispatch({
      type: "reorderList",
      data: {
        strategy,
        listIdx,
        todoIdx
      }
    });
    axios.put(
      `${serverUrl}/api/lists/${list.id}/todos/order`,
      {
        strategy,
        todoId: todo.id
      },
      {headers: {
        "x-collection-token": collection.token
      }}
    )
      .catch(e => console.error(e));
  };

  return (
    <li
      key = {id}
      className = {`p-2 ${todoIdx % 2 ? "has-background-light" : ""}`}
    >
      <span className = {` is-flex is-flex-wrap-wrap ${id === "new" ? "is-justify-content-center" : "is-justify-content-space-between"}`}
      >
        {todo?.id ?
          <span
            // className = "column is-half"
            style = {{textDecoration: todo.isComplete ? "line-through" : "none"}}
            value = {todo.id}
            onClick = {() => toggleComplete(todo.id, todoIdx)}
          >
            {todo.text}
          </span>
          :
          <></>
        }

        <span>
          {id === "new" ? <></> :
            <>
              <i
                className = {`bi-arrow-up-circle-fill is-size-5 px-1 ${canMoveUp ? "" : "has-text-grey-lighter"}`}
                aria-label = "Move to top"
                title = "Move to top"
                onClick = {() => moveItem("top")}
              />
            
              <i
                className = {`bi-arrow-up-short is-size-5 px-1 ${canMoveUp ? "" : "has-text-grey-lighter"}`}
                aria-label = "Move up one"
                title = "Move up one"
                onClick = {() => moveItem("up")}
              />
            
              <i
                className = {`bi-arrow-down-short is-size-5 px-1 ${canMoveDown ? "" : "has-text-grey-lighter"}`}
                aria-label = "Move down one"
                title = "Move down one"
                onClick = {() => moveItem("down")}
              />
            
              <i
                className = {`bi-arrow-down-circle-fill is-size-5 px-1 ${canMoveDown ? "" : "has-text-grey-lighter"}`}
                aria-label = "Move to bottom"
                title = "Move to bottom"
                onClick = {() => moveItem("bottom")}
              />
            </>
          }

          <i
            className = {`is-size-5 pl-3 ${
              isExpanded ? "bi-x-circle" :
                (id === "new" ? "bi-plus-circle" : "bi-pencil")}`
            }
            aria-label = {isExpanded ? "Close" :
              (id === "new" ? "Add new" : "Edit")
            }
            title = {isExpanded ? "Close" :
              (id === "new" ? "Add new" : "Edit")
            }
            onClick = {() => 
              isExpanded ?
                contractItem(id) : expandItem(id)
            }
          />
        </span>
      </span>

      
      
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
};

export default TodoListItem;