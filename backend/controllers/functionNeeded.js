// const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
// const BASE_ERROR = "BACK ERROR"
const fixedIV = Buffer.alloc(16, 0); // Fixed IV
const axios = require('axios');

const decryptField = (encryptedData, secretKey) => {
  try {
    // Ensure the encrypted data is a Buffer or convert it
    if (!Buffer.isBuffer(encryptedData)) {
      encryptedData = Buffer.from(encryptedData, 'hex');
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, fixedIV);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

const encryptField = (field, secretKey) => {
  try {
    // Ensure the field data is a Buffer or convert it
    if (!Buffer.isBuffer(field)) {
      field = Buffer.from(field, 'utf8');
    }

    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, fixedIV);
    let encrypted = cipher.update(field);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) 
  {
    return res.sendStatus(401);
  } // No token found

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};
module.exports = {
    decryptField, 
    encryptField,
    authenticateToken,
}
