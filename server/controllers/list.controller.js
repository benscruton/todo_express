const {List, Todo} = require("../models");

const listController = {

  // POST to /api/lists/:listId/todos
  addTodo: async (req, rsp) => {
    try{
      const {listId} = req.params;
      const todoData = req.body;

      const list = await List.findByPk(
        listId,
        {include: Todo}
      );
      if(todoData.dueDate === ""){
        delete todoData.dueDate;
      }
      todoData.orderRank = list.todos.length ?
        Math.max(
          ...list.todos.map(t => t.orderRank)
        ) + 1
        :
        0;

      const todo = await Todo.create(
        todoData,
        {fields: ["text", "isComplete", "dueDate", "notes", "orderRank"]}
      );
      await todo.setList(list);

      rsp.json({
        success: true,
        todo
      });
    }
    catch(error){
      rsp.status(500).json({
        success: false,
        error
      });
    }
  },

  // PUT to /api/lists/:listId/todos/order
  reorderTodos: async (req, rsp) => {
    try{
      const {listId} = req.params;
      const {strategy, todoId, todoId2} = req.body;
      const list = await List.findByPk(
        listId,
        {
          include: Todo,
          order: [
            [Todo, "orderRank", "ASC"]
          ]
        }
      );
      if(!todoId){
        return rsp.json({
          success: false,
          message: "Include a todoId in the request body"
        });
      }

      switch(strategy){
        case "up":
        case "down":
          const todoIds = list.todos.map(todo => todo.id);
          const todoIdx = todoIds.indexOf(todoId);
          const switchIdx = (strategy === "up" ? todoIdx - 1 : todoIdx + 1);

          const original = list.todos[todoIdx];
          const swapWith = list.todos[switchIdx];
          
          if(!swapWith) {
            return rsp.json({success: "false", message: "Impossible movement"});
          }
          await Todo.update(
            {orderRank: swapWith.orderRank},
            {where: {id: original.id}}
          );
          await Todo.update(
            {orderRank: original.orderRank},
            {where: {id: swapWith.id}}
          );
          rsp.json({success: true});
          break;

        case "top": 
          const topRank = Math.min(
            ...list.todos.map(t => t.orderRank)
          ) - 1;
          await Todo.update(
            {orderRank: topRank},
            {where: {id: todoId}}
          );
          rsp.json({success: true});
          break;

        case "bottom":
          const bottomRank = Math.max(
            ...list.todos.map(t => t.orderRank)
          ) + 1;
          await Todo.update(
            {orderRank: bottomRank},
            {where: {id: todoId}}
          );
          rsp.json({success: true});
          break;

        default:
          rsp.json({
            success: false,
            message: "Strategy not recognized."
          });
      }
    }
    catch(error){
      rsp.status(500).json({success: false, error});
    }
  },
};

module.exports = listController;