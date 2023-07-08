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
      rsp.status(400).json({
        success: false,
        error
      });
    }
  },
};

module.exports = listController;