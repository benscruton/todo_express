const CryptoJS = require("crypto-js");
const secretKeys = {
  client: process.env.AES_SECRET_KEY_CLIENT,
  db: process.env.AES_SECRET_KEY_DB
};

const encryptString = ({plain, keyName}) => {
  if(!Object.keys(secretKeys).includes(keyName)){
    keyName = "client";
  }
  const secretKey = secretKeys[keyName];
  return CryptoJS.AES.encrypt(
    `${plain}`,
    secretKey
  ).toString();
};

const decryptString = ({encr, keyName}) => {
  if(!Object.keys(secretKeys).includes(keyName)){
    keyName = "client";
  }
  const secretKey = secretKeys[keyName];
  return CryptoJS.AES.decrypt(
    `${encr}`,
    secretKey
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptString,
  decryptString
};