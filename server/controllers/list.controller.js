const {List, Todo} = require("../models");

const listController = {

  // POST to /api/lists/:listId/todos
  addTodo: async (req, rsp) => {
    try{
      const {listId} = req.params;
      const {todo: todoData} = req.body;

      const list = await List.findByPk(
        listId,
        {include: Todo}
      );
      todoData.orderRank = list.todos.length;
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

  // POST to /api/lists/:listId/todos/order
  // reorderTodos: (req, rsp) => {
    // Think about how to do this.  Could just move
    // one to-do, and add a :todoId param into
    // the route and a newOrderRank field in the
    // post body?  Then, update the original,
    // and increment everything in between.
    // Or, it could be a one-for-one swap sort
    // of a thing.
  // }
};

module.exports = listController;