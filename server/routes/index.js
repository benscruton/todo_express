const router = require("express").Router();

const collectionRoutes = require("./collection.routes");
const listRoutes = require("./list.routes");
const todoRoutes = require("./todo.routes");
// const testRoutes = require("./test.routes");

router.use("/api/collections", collectionRoutes);
router.use("/api/lists", listRoutes);
router.use("/api/todos", todoRoutes);
// router.use("/api/test", testRoutes);

// if serving build files:
const path = require("path");
router.use((_, rsp) => {
  rsp.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;