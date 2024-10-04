const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { registerValidations, validateRegistration } = require('../validators/registerValidations')
const { loginValidations, validateLogin } = require('../validators/loginValidations')

authRouter.get('/login', authController.getLoginPage)
authRouter.post('/login', loginValidations, validateLogin, authController.userLogin)

authRouter.get('/register', authController.getRegisterPage)
authRouter.post('/register', registerValidations, validateRegistration, authController.userRegister)

module.exports = authRouter