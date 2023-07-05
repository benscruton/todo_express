const router = require("express").Router();
const {todoController} = require("../controllers");

router.route("/test")
  .get(todoController.test);

router.route("/")
  .get(todoController.all)
  .post(todoController.create);

router.route("/:todoId")
  .get(todoController.findById)
  .put(todoController.updateById)
  .delete(todoController.softDeleteById);

module.exports = router;