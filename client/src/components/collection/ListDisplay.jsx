import {useState} from "react";
import TodoListItem from "../todo/TodoListItem";

const ListDisplay = ({list, listIdx, showComplete}) => {
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

  return (
    <div className = "box">
      <h2 className = "subtitle is-size-3 has-text-centered">
        {list.name}
      </h2>

      <ul>
        {list.todos
          .filter(todo => 
            showComplete ? true : !todo.isComplete
          )
          .map((todo, todoIdx) =>
            <TodoListItem
              key = {todo?.id || "new"}
              todo = {todo}
              todoIdx = {todoIdx}
              list = {list}
              listIdx = {listIdx}
              expandedItems = {expandedItems}
              expandItem = {expandItem}
              contractItem = {contractItem}
            />
          )
        }

        {/* Probably make this its own thing at some point */}
        <TodoListItem
          todo = {null}
          list = {list}
          listIdx = {listIdx}
          expandedItems = {expandedItems}
          expandItem = {expandItem}
          contractItem = {contractItem}
        />
      </ul>
    </div>
  );
};

export default ListDisplay;