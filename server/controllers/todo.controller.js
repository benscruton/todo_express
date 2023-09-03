const dayjs = require("dayjs");
const {Todo} = require("../models");

const todoController = {

  // GET to /api/todos/:todoId
  findById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.findByPk(
      todoId
    )
      .then(todo => rsp.json(todo))
      .catch(error => rsp.status(400).json({error}));
  },

  // PUT to /api/todos/:todoId
  updateById: async (req, rsp) => {
    try{
      const {todoId} = req.params;
      const todoData = req.body;
      if(!dayjs(todoData.dueDate).isValid()){
        delete todoData.dueDate;
      }

      const [count] = await Todo.update(
        req.body,
        {
          where: {id: todoId},
          fields: ["text", "dueDate", "notes"]
        }
      );
      const todo = await Todo.findByPk(
        todoId
      );
      rsp.json({
        updated: !!count,
        todo
      });
    }
    catch(error){
      rsp.status(500).json({error});
    };
  },

  // DELETE to /api/todos/:todoId
  deleteById: async (req, rsp) => {
    const {todoId} = req.params;
    Todo.destroy(
      {where: {id: todoId}}
    )
      .then(count => rsp.json({deleted: !!count}))
      .catch(error => rsp.status(500).json({error}));
  },
};

module.exports = todoController;