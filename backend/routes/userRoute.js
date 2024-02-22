const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../controllers/functionNeeded')
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello');
});
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticateToken.authenticateToken,userController.getProfile);
router.put('/profile', userController.updateProfile);
router.delete('/profile', userController.deleteUser);
router.get('/all', userController.listUsers);
router.post('/sendMail', userController.sendMail);
router.post('/sendMailWithOTP', userController.sendMailWithOTP);
router.post('/updatePassword', userController.updatePassword)
router.post('/getOTP', userController.getOTP);
router.post('/getUserByID', userController.getUserByID);

module.exports = router;
