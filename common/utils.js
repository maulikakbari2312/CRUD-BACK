const cryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const encryptedData = async (password) => {
  const encryptedPassword = cryptoJS.AES.encrypt(
    password,
    secretKey
  ).toString();
  return encryptedPassword;
};

const decryptData = async (password) => {
  try {
    const decryptedBytes = cryptoJS.AES.decrypt(password, secretKey);
    const decryptedPassword = decryptedBytes.toString(cryptoJS.enc.Utf8);
    if (!decryptedPassword) {
      throw new Error("Decryption failed: Invalid input or secret key.");
    }
    return decryptedPassword;
  } catch (error) {
    console.error("Decryption error:", error.message);
    return null;
  }
};

// const generateProductId = (productName) => {
//   const formattedProductName = productName.replace(/\s+/g, "").toUpperCase();
//   const prefix = `${formattedProductName}-`;
//   const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
//   const productId = `${prefix}${randomPart}`;
//   console.log(`Generated SubProduct ID: ${productId}`);
//   return productId;
// };

// const generateUniqueId = async () => {
//   return uuidv4();
// };

// const sendMail = async (to, subject, html) => {
//   let mailTransporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_ID,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   let mailDetails = {
//     from: process.env.EMAIL_ID,
//     to,
//     subject,
//     html
//   };

//   return new Promise((resolve, reject) => {
//     mailTransporter.sendMail(mailDetails, (err, data) => {
//       if (err) {
//         console.log("Error Occurs", err);
//         reject(err);
//       } else {
//         console.log("Email sent successfully", data);
//         resolve(data);
//       }
//     });
//   });
// };

// const generateOTP = async () => {
//   const minm = 1000;
//   const maxm = 9999;
//   return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
// };

module.exports = {
  encryptedData,
  decryptData,
  // generateProductId,
  // generateUniqueId,
  // sendMail,
  // generateOTP
};
