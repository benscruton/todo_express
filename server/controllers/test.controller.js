const testController = {
  test: (req, rsp) => rsp.json({message: "Controller: Success!"})
};

module.exports = testController;