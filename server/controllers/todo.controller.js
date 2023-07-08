const {List, Todo} = require("../models");

const todoController = {

  // GET to /api/todos (dev only)
  all: (_, rsp) => {
    Todo.findAll()
      .then(todos => {
        console.log(todos);
        rsp.json({todos});
      })
      .catch(error => rsp.status(400).json({error}));
  },
  


  // findById: (req, rsp) => {
  //   const {todoId} = req.params;
  //   Todo.findByPk(todoId)
  //     .then(todo => rsp.json(todo))
  //     .catch(error => rsp.status(400).json({error}));
  // },


  updateById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.update(
      req.body.todo,
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