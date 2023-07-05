const router = require("express").Router();
const {todoController} = require("../controllers");

router.route("/test")
  .get(todoController.test);

router.route("/")
  .post(todoController.create);

router.route("/:todoId")
  .get(todoController.findById);

module.exports = router;