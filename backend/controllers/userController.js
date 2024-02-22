const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const { stringify } = require('querystring');
const nodemailer = require('nodemailer');
const{ decryptField, encryptField} = require('../controllers/functionNeeded');
const BASE_ERROR = "BACK ERROR"


// Register a new user

exports.register = async (req, res) => {
  try {
    const { name, surname, username, password, email, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(500).send("User with the given username or email already exists.");
    }
    const user = new User({ name, surname, username, password, email, role });
    await user.save();
    res.status(201).send({ message: "User registered successfully!", user_id: user._id });
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.createUser = async (test) => {
  try {
    const { name, surname, username, password, email, role } = test;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(500).send("User with the given username already exists.");
    }
    const user = new User({ name, surname, username, password, email, role });
    await user.save();
  } catch (error) {
    console.error(BASE_ERROR)
    return null;
  }
};

// Authenticate a user and return a token/session
exports.login = async (req, res) => {
  try {

    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(501).json({ message: 'Login failed: User not found.' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(501).json({ message: 'Login failed: Incorrect password.' });
    }

    // User authenticated, generate a JWT
    const token = jwt.sign(
      { userId: user._id, username: req.body.username, role: user.role}, // Use the plain username in the token payload
      secretKey,
      { expiresIn: '1h' } // Token expiry
    );

    // Respond with the JWT and potentially the username if needed
    res.json({ token, username: req.body.username, user: user }); // Do not send encryptedUsername to the client
  } catch (error) {
    res.status(500).json({ message: 'Server error during the login process.' });
  }
};

// Get profile of a user
exports.getProfile = async (req, res) => {
  try {
    // The user's ID should be in req.user if your authentication middleware is set up correctly
    const userId = req.user.userId;

    // Fetch user details from the database
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(504).send('User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

// Update a user's profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body; // Get updates from request
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) {
      return res.status(504).send("User not found.");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(504).send("User not found.");
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getUserByID =  async (req, res) => {
  try {
    const user = await User.findOne({ _id : req.body._id });
    if (!user) {
      return res.status(504).send("User not found.");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

// List all users (for admin use)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Fetch all users excluding passwords

    // Fetch the secret key from the environment variable
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

    // Decrypt the fields for each user
    users.forEach(user => {
      user.name = decryptField(user.name, secretKey);
      user.surname = decryptField(user.surname, secretKey);
      user.username = decryptField(user.username, secretKey);
      user.email = decryptField(user.email, secretKey);
      // Add other fields to decrypt as necessary
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.addManyUsers = async (req, res) => {
  try {
    const users = req.body;  // Assume an array of users is passed in the request body
    const result = await User.insertMany(users);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.sendMail = async (req, res) => {
  try {
    const KEY_MAIL = process.env.KEY_MAIL;

    const { username, email, text } = req.body;

    // Configuration of nodeMailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cqld.iut@gmail.com',
        pass: KEY_MAIL,
      },
    });

    // Defining the content of the mail
    const mailOptions = {
      from: email,
      to: 'cqld.iut@gmail.com',
      subject: 'Nouveau message de contact',
      text: `Un utilisateur a rempli le formulaire de contact.\n\nNom d'utilisateur: ${username}\nAdresse e-mail: ${email}\nMessage: ${text}`,

    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('E-mail envoyé : ' + info.response);
    });
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};


exports.sendMailWithOTP = async (req, res) => {
  try {
    const KEY_MAIL = process.env.KEY_MAIL;

    const { email } = req.body;

    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    // Configurer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cqld.iut@gmail.com',
        pass: KEY_MAIL,
      },
    });

    // Définir le contenu de l'e-mail
    const mailOptions = {
      from: 'cqld.iut@gmail.com', 
      to: email ,
      subject: 'Code OTP pour la réinitialisation du mot de passe',
      text: `Votre code OTP est : ${otp}`,

    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('E-mail envoyé : ' + info.response);
    });

    
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    const mail_encrypt = encryptField(email, secretKey);
    await User.findOneAndUpdate({ email: mail_encrypt }, { $set: { otp_number: otp } });


  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    const mail_encrypt = encryptField(req.body.email, secretKey);
    const user = await User.findOne({email: mail_encrypt}); 

    bcrypt.hash(req.body.new_pwd, 10, async (err, hash) => {
    if (err) return next(err);
    const mdp_encrypt = hash;
    await User.findOneAndUpdate({ email: mail_encrypt }, { $set: { password: mdp_encrypt } });
    next();
  });

    if (!user){
      res.status(200).send('User non trouvé') ; 
    }    
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};


exports.getOTP = async (req, res) => {

  try {
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    const mail_encrypt = encryptField(req.body.email, secretKey);
    const user = await User.findOne({email: mail_encrypt}); 

    if (!user){
      res.status(200).send('User non trouvé') ; 
    }    
    const otp = user.otp_number
    res.status(200).send(otp);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};


