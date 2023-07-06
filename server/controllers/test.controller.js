const testController = {
  test: (req, rsp) => rsp.json({message: "Controller: Success!"}),

  tryCookie: (req, rsp) => {
    console.log(req.cookies);
    rsp.cookie("hello", {test: true}).json({success: "idk"});
  }
};

module.exports = testController;