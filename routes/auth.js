const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');


authRouter.get('/login', authController.getLoginPage)
authRouter.post('/login', authController.userLogin)

authRouter.get('/register', authController.getRegisterPage)
authRouter.post('/register', authController.userRegister)

module.exports = authRouter