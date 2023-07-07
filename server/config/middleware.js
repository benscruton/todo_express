const middleware = {
  validateApiKey: (req, rsp, next) => {
    const apiKey = req.headers["x-api-key"];
    const allowedApiKeys = JSON.parse(process.env.API_KEYS);
    if(!allowedApiKeys.includes(apiKey)){
      return rsp.status(401).json({error: "forbidden"});
    }
    next();
  }
};

module.exports = middleware;