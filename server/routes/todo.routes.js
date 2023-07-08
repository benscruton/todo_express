const router = require("express").Router();
const {todoController} = require("../controllers");
const {confirmPassphrase} = require("../config/middleware");

// Disable in production
router.route("/")
  .get(todoController.all)

router.route("/:todoId")
  // .post(confirmPassphrase, todoController.findById)
  .put(confirmPassphrase, todoController.updateById)
  .delete(confirmPassphrase, todoController.softDeleteById);

module.exports = router;