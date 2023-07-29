const testController = {
  test: (req, rsp) => {
    console.log(req);
    rsp.json({
      message: "Controller: Success!",
      method: req.method,
      body: req.body
    });
  },

  tryCookie: (req, rsp) => {
    console.log(req.cookies);
    rsp.cookie("hello", {test: true}).json({success: "idk"});
  }
};

module.exports = testController;