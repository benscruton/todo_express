const {List, Todo} = require("../models");

const todoController = {
  test: (req, rsp) => rsp.json({message: "Controller: Success!"}),

  all: (_, rsp) => {
    Todo.findAll()
      .then(todos => rsp.json({todos}))
      .catch(error => rsp.status(400).json({error}));
  },
  
  create: async (req, rsp) => {
    try{
      const {listId} = req.params;

      const todo = await Todo.create(req.body.todo);
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

  findById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.findByPk(todoId)
      .then(todo => rsp.json(todo))
      .catch(error => rsp.status(400).json({error}));
  },

  updateById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.update(
      req.body,
      {where: {id: todoId}}
    )
      .then(([count]) =>
        Todo.findByPk(todoId)
          .then(todo => rsp.json({
            updated: !!count,
            todo
          }))
          .catch(error => rsp.json({error}))
      )
      .catch(error => rsp.json({error}));
  },

  softDeleteById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.destroy(
      {where: {id: todoId}}
    )
      .then(count => rsp.json({deleted: !!count}))
      .catch(error => rsp.json({error}));
  },
};

module.exports = todoController;