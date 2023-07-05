const {Todo} = require("../models");

const todoController = {
  test: (req, rsp) => rsp.json({message: "Controller: Success!"}),

  all: (_, rsp) => {
    Todo.findAll({
      attributes: {exclude: ["deletedAt"]},
      where: {deletedAt: null}
    })
      .then(todos => rsp.json({todos}))
      .catch(error => rsp.json({error}));
  },
  
  create: (req, rsp) => {
    Todo.create(
      req.body,
      {fields: ["text", "isComplete", "dueDate"]}
    )
      .then(todo => rsp.json({
        success: true,
        todo
      }))
      .catch(error => rsp.json({
        success: false,
        error
      }));
  },

  findById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.findByPk(
      todoId,
      {attributes: {exclude: ["deletedAt"]}}
    )
      .then(todo => rsp.json(todo));
  },

  updateById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.update(
      req.body,
      {where: {id: todoId}}
    )
      .then(([count]) =>
        Todo.findByPk(
          todoId,
          {attributes: {exclude: ["deletedAt"]}}
        )
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
    Todo.update(
      {deletedAt: new Date()},
      {where: {
        id: todoId,
        deletedAt: null
      }}
    )
      .then(([count]) => rsp.json({success: !!count}))
      .catch(error => rsp.json({error}));
  },
};

module.exports = todoController;