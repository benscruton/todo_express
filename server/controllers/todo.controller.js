const {List, Todo} = require("../models");

const todoController = {

  // GET to /api/todos (dev only)
  all: (_, rsp) => {
    Todo.findAll()
      .then(todos => {
        console.log(todos);
        rsp.json({todos});
      })
      .catch(error => rsp.status(500).json({error}));
  },
  
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
      const [count] = await Todo.update(
        req.body,
        {where: {id: todoId}}
      );
      const todo = await Todo.findByPk(
        todoId
      )
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
  softDeleteById: async (req, rsp) => {
    const {todoId} = req.params;
    Todo.destroy(
      {where: {id: todoId}}
    )
      .then(count => rsp.json({deleted: !!count}))
      .catch(error => rsp.status(500).json({error}));
  },
};

module.exports = todoController;