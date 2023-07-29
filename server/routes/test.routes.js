const router = require("express").Router();
const {testController} = require("../controllers");
const {confirmPassphrase} = require("../config/middleware");

router.route("/")
  .all(testController.test);

router.route("/cookie")
  .get(testController.tryCookie);

router.route("/c/:collectionId")
  .get(confirmPassphrase, testController.test);

router.route("/l/:listId")
  .get(confirmPassphrase, testController.test);

router.route("/t/:todoId")
  .get(confirmPassphrase, testController.test);

module.exports = router;