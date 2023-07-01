const router = require("express").Router();
const {testController} = require("../controllers");

router.route("/")
  .get(testController.test);

module.exports = router;