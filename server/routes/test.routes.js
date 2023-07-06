const router = require("express").Router();
const {testController} = require("../controllers");

router.route("/")
  .get(testController.test);

router.route("/cookie")
  .get(testController.tryCookie);

module.exports = router;