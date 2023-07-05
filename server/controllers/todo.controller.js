const {Todo} = require("../models");

const todoController = {
  test: (req, rsp) => rsp.json({message: "Controller: Success!"}),

  create: (req, rsp) => {
    Todo.create(req.body)
      .then(todo => rsp.json(todo));
  },

  findById: (req, rsp) => {
    const {todoId} = req.params;
    Todo.findAll({
      where: {
        id: todoId
      }
    })
      .then(todo => rsp.json(todo));
  },
};

module.exports = todoController;