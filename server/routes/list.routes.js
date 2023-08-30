const router = require("express").Router();
const {listController} = require("../controllers");
const {confirmPassphrase} = require("../config/middleware");

router.route("/:listId")
  .delete(confirmPassphrase, listController.deleteList);

router.route("/:listId/todos")
  .post(confirmPassphrase, listController.addTodo);

router.route("/:listId/todos/order")
  .put(confirmPassphrase, listController.reorderTodos);

module.exports = router;