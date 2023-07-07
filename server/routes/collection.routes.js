const router = require("express").Router();
const {collectionController} = require("../controllers");

router.route("/")
  .post(collectionController.create);

router.route("/:collectionId")
  .post(collectionController.getCollection);

router.route("/:collectionId/access")
  .post(collectionController.grantCollectionAccess);

module.exports = router;