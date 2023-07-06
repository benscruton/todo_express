const CryptoJS = require("crypto-js");
const secretKey = process.env.AES_SECRET_KEY;

const encryptString = plain =>
  CryptoJS.AES.encrypt(
    `${plain}`,
    secretKey
  ).toString();

const decryptString = encr =>
  CryptoJS.AES.decrypt(
    `${encr}`,
    secretKey
  ).toString(CryptoJS.enc.Utf8);

module.exports = {
  encryptString,
  decryptString
};