const router = require("express").Router();
const {collectionController} = require("../controllers");
const {
  middleware: {validateApiKey}
} = require("../config");

router.route("/")
  .post(validateApiKey, collectionController.create);

router.route("/:collectionId")
  .post(collectionController.getCollection);

router.route("/:collectionId/access")
  .post(collectionController.grantCollectionAccess);

module.exports = router;