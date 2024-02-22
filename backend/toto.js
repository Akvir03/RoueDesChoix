// const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

 // Make sure the key is correctly formatted
const fixedIV = Buffer.alloc(16, 0); // Fixed IV

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
  

const secretKey = Buffer.from("4ddd91d77880676211c363d798834ae0143c6ca18893d3adf1f1ba808adbb2ea", 'hex');
let encryptedTest = encryptField("toto",secretKey)
