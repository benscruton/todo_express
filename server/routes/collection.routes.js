const router = require("express").Router();
const {collectionController} = require("../controllers");
const {
  validateApiKey,
  confirmPassphrase
} = require("../config/middleware");

router.route("/")
  .post(validateApiKey, collectionController.create);

router.route("/:collectionId")
  .get(confirmPassphrase, collectionController.getCollection);

router.route("/:collectionId/access")
  .post(confirmPassphrase, collectionController.encryptPassphrase);

module.exports = router;