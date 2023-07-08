const router = require("express").Router();
const {listController} = require("../controllers");
const {confirmPassphrase} = require("../config/middleware");

router.route("/:listId/todos")
  .post(confirmPassphrase, listController.addTodo);

module.exports = router;