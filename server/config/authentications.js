const authentications = {
  apiKeyValid: apiKey => {
    const allowedApiKeys = JSON.parse(process.env.API_KEYS);
    return allowedApiKeys.includes(apiKey);
  }
};

module.exports = authentications;