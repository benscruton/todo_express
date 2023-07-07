const router = require("express").Router();

const collectionRoutes = require("./collection.routes");
const testRoutes = require("./test.routes");
const todoRoutes = require("./todo.routes");

router.use("/api/collections", collectionRoutes);
router.use("/api/test", testRoutes);
router.use("/api/todos", todoRoutes);

module.exports = router;