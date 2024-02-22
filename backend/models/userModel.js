
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /.+@.+\..+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  role: {
    type: String,
    required: [true, 'No Role or Wrong role'],
    enum: ['admin', 'user'],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  last_login: {
    type: Date,
    required: true,
    default: Date.now,
  }, 
  otp_number :{
    type: String,
    required: false,
    default: '0',
  },
});

UserSchema.pre('save', function(next) {
  const user = this;

  // Fetch the secret key from the environment variable
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');  

  user.name = encryptField(user.name, secretKey);
  user.surname = encryptField(user.surname, secretKey);
  user.email = encryptField(user.email, secretKey);

  next();
});

// Hash the password
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

/*
 * Key Points:
 * - The `pre('save')` middleware functions automatically run before a document is saved.
 * - When creating or updating users via the exported model, the encryption and hashing processes 
 *   are applied automatically due to the attached middleware.
*/
  module.exports = mongoose.model('User', UserSchema);