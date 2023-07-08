const {List, Todo} = require("../models");

const listController = {

  // POST to /api/lists/:listId/todos
  addTodo: async (req, rsp) => {
    try{
      const {listId} = req.params;

      const todo = await Todo.create(
        req.body.todo,
        {fields: ["text", "isComplete", "dueDate", "notes"]}
      );
      const list = await List.findByPk(listId);
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