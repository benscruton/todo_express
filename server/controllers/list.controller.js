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
        {include: Todo}
      );
      if(!todoId){
        return rsp.json({
          success: false,
          message: "Include a todoId in the request body"
        });
      }

      switch(strategy){
        case "swap":
          if(!todoId2){
            return rsp.json({
              success: false,
              message: "For swap, request body must also include todoId2"
            });
          }
          const {orderRank: rank1} = await Todo.findByPk(todoId);
          const {orderRank: rank2} = await Todo.findByPk(todoId2);
          await Todo.update(
            {orderRank: rank2},
            {where: {id: todoId}}
          );
          await Todo.update(
            {orderRank: rank1},
            {where: {id: todoId2}}
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
      rsp.status(500).rsp({success: false, error});
    }
  }
};

module.exports = listController;