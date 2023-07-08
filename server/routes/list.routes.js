const router = require("express").Router();
const {
  listController,
  todoController
} = require("../controllers");
const {
  confirmPassphrase
} = require("../config/middleware");

router.route("/:listId/todos")
  .post(confirmPassphrase, todoController.create);

module.exports = router;