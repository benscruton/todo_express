const router = require("express").Router();

const testRoutes = require("./test.routes");
router.use("/api/test", testRoutes);

module.exports = router;